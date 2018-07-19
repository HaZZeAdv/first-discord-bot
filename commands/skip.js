const { queue } = require('../assets/variables.js');
module.exports.run = async (bot, message, args) => {
    const serverQueue = queue.get(message.guild.id);
    if (!message.member.voiceChannel) return message.channel.send('Nu eşti într-un canal vocal.');
	if (!serverQueue) return message.channel.send('Încă n-am început să cânt.');
	serverQueue.connection.dispatcher.end('Comanda (skip) a fost utilizată.');
    return undefined;
}

module.exports.help = {
    name: "skip",
    type: "music",
    desc: "Sari peste o melodie care nu-ţii place.",
    usage: "skip"
}