const Discord = require("discord.js");
const Funct = require("../assets/functions.js");

exports.run = async (bot, message, args) => {
    let avaiablecommand = bot.commands.filter(cmd => cmd.help.name === args[0]).map(cmd => cmd.help.name);  
    if(args.length < 1) return;
    if(args[0] === "all") {
        let help = new Discord.RichEmbed()
            .setAuthor("List of Commands")
            .addField("user commands", `${bot.commands.filter(cmd => cmd.help.type === 'user').map(cmd => `**${cmd.help.name}** - ${cmd.help.desc}`).join("\n")}`, false)
            .addField("info commands", `${bot.commands.filter(cmd => cmd.help.type === 'info').map(cmd => `**${cmd.help.name}** - ${cmd.help.desc}`).join("\n")}`, false)
            .addField("fun commands", `${bot.commands.filter(cmd => cmd.help.type === 'fun').map(cmd => `**${cmd.help.name}** - ${cmd.help.desc}`).join("\n")}`, false)
            .addField("music commands", `${bot.commands.filter(cmd => cmd.help.type === 'music').map(cmd => `**${cmd.help.name}** - ${cmd.help.desc}`).join("\n")}`, false)
            .addField("admin commands", `${bot.commands.filter(cmd => cmd.help.type === 'admin').map(cmd => `**${cmd.help.name}** - ${cmd.help.desc}`).join("\n")}`, false);
         message.channel.send(help);
    }
    else if(args[0] === "type") {
        let help = new Discord.RichEmbed()
            .setAuthor("Type of Commands")
            .setDescription("**user** - Comenzi pentru toţi utilizatorii.\n**info** - Comenzi pentru informare.\n**fun** - Comenzi pentru amuzament.\n**music** - Comenzi pentru muzică.\n**admin** - Comenzi administrative.")
            message.channel.send(help);
    }
    else if(args[0] === "user" || args[0] === "info" || args[0] === "fun" || args[0] === "music" || args[0] === "admin"){
        let help = new Discord.RichEmbed()
            .setAuthor(`${args[0]} commands`)
            .setDescription(`${bot.commands.filter(cmd => cmd.help.type === args[0]).map(cmd => `**${cmd.help.name}** - ${cmd.help.desc}`).join("\n")}`)
        message.channel.send(help);
    }
    else if(avaiablecommand.some(args => message.content.includes(args)) ) {
        Funct.SendUsage(bot, message, args[0]);
    }
    else return message.channel.send("Tipul de comanda specificat nu exista.")
}

exports.help = {
    name: "help",
    type: "admin",
    desc: "Afişează lista de comenzi/ajutor pentru o comandă.",
    usage: "help <all/type/command>"
}