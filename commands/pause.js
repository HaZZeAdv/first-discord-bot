const { queue } = require('../assets/variables.js');
module.exports.run = async (bot, message, args) => {
    const serverQueue = queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return message.channel.send('⏸ Stop! Pauzăăăă...');
    }
    return message.channel.send('Încă n-am început să cânt.');
}

module.exports.help = {
    name: "pause",
    type: "music",
    desc: "Pune pauză unei melodii.",
    usage: "pause"
}