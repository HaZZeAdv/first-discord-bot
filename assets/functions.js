const Discord = require('discord.js');
module.exports = {
    SendUsage: function(bot, message, command) {
        let HaveUsage = bot.commands.filter(cmd => cmd.help.name != cmd.help.usage).map(cmd => cmd.help.name);
        if(HaveUsage.some(command => message.content.includes(command)) ) {
            let syntax = new Discord.RichEmbed()
                .setAuthor("Command "+ command)
                .addField("Descriere", `${bot.commands.filter(cmd => cmd.help.name === command).map(cmd => cmd.help.desc)}`, false)
                .addField("Utilizare", `${bot.commands.filter(cmd => cmd.help.name === command).map(cmd => cmd.help.usage)}`, true);
            message.channel.send(syntax);
        }
    }
}

module.exports.error = ( message, text) => {
    let embed = new Discord.RichEmbed()
        .setTitle("Error")
        .setDescription(text)
        //.setColor("#DC2F4C");

    message.channel.send(embed);
}

module.exports.say = (message, title, text) => {
    let embed = new Discord.RichEmbed()
        .setTitle(title)
        .setDescription(text)
        .setColor("#1ABC9C");

    message.channel.send(embed);
}