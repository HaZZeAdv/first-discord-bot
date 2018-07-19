const { queue } = require('../assets/variables.js');
module.exports.run = async (bot, message, args) => {
    const serverQueue = queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return message.channel.send('▶ Redare.');
    }
    return message.channel.send('Încă n-am început să cânt.');
}

module.exports.help = {
    name: "resume",
    type: "music",
    desc: "Redă melodia pe care ai pus-o pe pauză.",
    usage: "resume"
}