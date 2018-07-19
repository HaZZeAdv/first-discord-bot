const { queue } = require('../assets/variables.js');
module.exports.run = async (bot, message, args) => {
    const serverQueue = queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send('Încă n-am început să cânt.');
        let index = 0;
		return message.channel.send(`
__**Lista de redare:**__

${serverQueue.songs.map(song => `**${++index} - ** ${song.title}`).join('\n')}

**Acum cântă:** ${serverQueue.songs[0].title}
		`);
}

module.exports.help = {
    name: "queue",
    type: "music",
    desc: "Arată lista de redare a melodiilor.",
    usage: "queue"
}