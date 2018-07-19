const { queue } = require('../assets/variables.js');
module.exports.run = async (bot, message, args) => {
    const serverQueue = queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send('Încă n-am început să cânt.');
    return message.channel.send(`🎶 Acum cântă: **${serverQueue.songs[0].title}**`);
}

module.exports.help = {
    name: "np",
    type: "music",
    desc: "Arată ce melodie rulează acum.",
    usage: "np"
}