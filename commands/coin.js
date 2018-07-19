const Discord = module.require('discord.js');
const hd = [
    "Cap",
    "Pajură"
];

module.exports.run = async (bot, message, args) => {

  message.channel.send(message.author.toString() + " a aruncat: " + (hd[Math.floor(Math.random() * hd.length)]));
}

module.exports.help = {
    name: "coin",
    type: "fun",
    desc: "Aruncă o monetă şi vezi dacă pică cap sau pajură.",
    usage: "coin"
}
