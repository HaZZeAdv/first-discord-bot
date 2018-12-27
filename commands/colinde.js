const { queue } = require('../assets/variables.js');
const { YT_API_TOKEN } = require('../assets/config.json');
const { Util } = require('discord.js');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const youtube = new YouTube(process.env.YT_TOKEN);

async function handleVideo(video, message, voiceChannel, playlist = false) {
	const serverQueue = queue.get(message.guild.id);
	//console.log(video);
	const song = {
		id: video.id,
		title: `Fuego - Colinde`,
		url: `https://youtube.com/watch?&v=3jzPbF17GFc`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(message.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(message.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Nu pot să vin în acel canal vocal: ${error}`);
			queue.delete(message.guild.id);
			return message.channel.send(`Nu pot să vin în acel canal vocal: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return message.channel.send(`✅ **${song.title}** a fost adăugată la lista de redare.`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Acum cântă: **${song.title}**`);
}

module.exports.run = async (bot, message, args) => {
    const voiceChannel = message.member.voiceChannel;
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    if(args.length < 0) return;
		if (!voiceChannel) return message.channel.send('Nu eşti într-un canal vocal.');
		const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) {
			return message.channel.send('Nu am permisiunea să cânt în acel canal vocal...');
		}
		if (!permissions.has('SPEAK')) {
			return message.channel.send('Nu am permisiunea să cânt...');
		}
		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return message.channel.send(`✅ Playlist: **${playlist.title}** a fost adăugat.`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(args, 1);
					var video = await youtube.getVideoByID(videos[0].id);
				} catch (err) {
					console.error(err);
					return message.channel.send('🆘 Nu am putut să găsesc nimic...');
				}
			}
			return handleVideo(video, message, voiceChannel);
		}
}

module.exports.help = {
    name: "colinde",
    type: "music",
    desc: "Fuego - Colinde.",
    usage: "colinde"
}
