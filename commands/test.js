const Discord = require("discord.js");
const Funct = require("../assets/functions.js");
const agree = "✅";
const { report_channel } = require("../assets/config.json");
module.exports.run = async (bot, message, args) => {
  message.delete();
  if(args.length < 1) return;
  //if(args.length < 1) return message.channel.send("Utilizare: **!report <user> <reason>**");
  let reportedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!reportedUser) return Funct.error(message, "Nu am putut să găsesc acel utilizator.");
  let Reason = args.join(" ").slice(22);
  if(!Reason) return Funct.error(message, "Specifică motivul.");
  let reportEmbed = new Discord.RichEmbed()
  .setAuthor("Report", bot.user.avatarURL)
  .addField("Mesaj", Reason)
  .addField("Utilizator raportat", `${reportedUser}`)
  let reportschannel = message.guild.channels.find(`name`, report_channel);
  if(!reportschannel) return Funct.error(message, "Canalul pentru reporturi nu există.");
  let msg = await reportschannel.send(reportEmbed);
  msg.react(agree);

  const filter = (reaction, user) => {
      return [agree].includes(reaction.emoji.name) && user.id === message.author.id;
  };
  
  msg.awaitReactions(filter, { max: 1, time: 10000000, errors: ['time'] })
  .then(collected => {
      const reaction = collected.first();
      if (reaction.emoji.name === agree) {
        msg.delete();
        let reportEmbed = new Discord.RichEmbed()
        .setAuthor("Report", bot.user.avatarURL)
        .addField("Mesaj", Reason)
        msg.channel.send(reportEmbed)
      } else return;
  })
  .catch(collected => {
      console.log(`Only ${collected.size} out of 4 reacted.`);
  });
  
}

module.exports.help = {
  name: "test",
  type: "user",
  desc: "Raportează pe cineva că a încălcat regulile.",
  usage: "test <@mention> <reason>"
}
