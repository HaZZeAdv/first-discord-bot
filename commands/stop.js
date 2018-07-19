const { queue } = require('../assets/variables.js');
module.exports.run = async (bot, message, args) => {
    const serverQueue = queue.get(message.guild.id);
    if (!message.member.voiceChannel) return message.channel.send('Nu eşti într-un canal vocal.');
	if (!serverQueue) return message.channel.send('Încă n-am început să cânt.');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end('Comanda (stop) a fost utilizată.');
    return undefined;
}

module.exports.help = {
    name: "stop",
    type: "music",
    desc: "Goneşte botul de pe canalul vocal.",
    usage: "stop"
}