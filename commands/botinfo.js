const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
        message.channel.send("HaZZe m-a creat. Dacă vrei să iei lăgătura cu el intră pe serveru' lui de discord:\nhttps://discord.gg/v8673V3");
}

module.exports.help = {
    name: "botinfo",
    type: "info",
    desc: "Afişează informaţiile despre bot.",
    usage: "botinfo"
}