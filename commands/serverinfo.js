const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Informaţii despre sever.")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Numele serverului", message.guild.name)
    .addField("Creat în data de", message.guild.createdAt)
    .addField("Te-ai alăturat la data de", message.member.joinedAt)
    .addField("Membrii", message.guild.memberCount);

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"serverinfo",
  type: "info",
  desc: "Arată informaţiile despre server.",
  usage: "serverinfo"
}