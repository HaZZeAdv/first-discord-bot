const Discord = require("discord.js");
const Funct = require("../assets/functions.js");
const agree = "✅";
const { newbie_channel } = require("../assets/config.json");
module.exports.run = async (bot, message, args) => {
  
  let NewBie = new Discord.RichEmbed()
  .setAuthor("Welcome", bot.user.avatarURL)
  .setDescription("Bine ai venit pe serverul nostru de discord, pentru a putea accesa celelalte canale trebuie să citeşti regulamentul şi câteva informaţii despre server.")
  .addField("Regulament", "** 1.**  Nu este permisă jignirea directă sau indirectă a unei persoane indiferent de rasă, sex, aspect, națiune, religie, vârstă și tot ce ține de persoana respectivă - __Warn/Mute/Kick/Ban__.\n** 2.**  Nu distribuiți link-uri dăunatoare, reclame fără aprobare sau imagini inadecvate - __Warn/Kick/Ban__.\n** 3.**  Nu este permisă reclama la alt server de discord fără acordul unui administrator - __Ban__.\n** 4.**  Chatul este un loc unde să vă exprimați părerile/concepțiile despre orice, în niciun caz un loc pentru certuri.\n**5.** Este interzis să faceți SPAM, spre exemple:\n- Mesaje scurte şi frecvente.\n- Mesaje cu publicităţi şi link-uri de orice tip.\n- Orice link pus oriunde spre alte servere/site-uri care nu sunt în parteneriat cu noi.")
  .addField("Informaţii suplimentare", `La acumularea a 3 Warn-uri primeşti ban.\nToţi membrii serverului, inclusiv membrii staff-ului trebuie să respecte regulamentul.\nPentru a avea acces la tot serverul apasă pe ${agree} de sub mesaj.`)
  .setColor("#1ABC9C")
  //.setThumbnail("http://icons.iconarchive.com/icons/graphicloads/polygon/128/problem-2-icon.png")
  .setTimestamp();
  let newbiechannel = message.guild.channels.find(`name`, newbie_channel);
  //if(!newbiechannel) return Funct.error(message, "Canalul pentru începători nu există.");
  let msg = await newbiechannel.send(NewBie);
  msg.react(agree);

  const filter = (reaction, user) => {
      return [agree].includes(reaction.emoji.name) && user.id === message.author.id;
  };
  
  msg.awaitReactions(filter, { max: 1, time: 120000, errors: ['time'] })
  .then(collected => {
      const reaction = collected.first();
      if (reaction.emoji.name === agree) {
        msg.delete()
        let role = message.guild.roles.find("name", "Ucenic");
        let member = message.member;
        member.addRole(role).catch(console.error);
        const Welcome = [
          "a aterizat aici, să-i urăm bun venit.",
          "a fost târâz aici, să-l întâmpinăm cum se cuvine.",
          "tocmai a trecut de verificare, nu e prost.",
          "a venit însfârşit.",
          "este acum un Ucenic."
        ];
        let WelcomeMessage = Welcome[Math.floor(Math.random()*Welcome.length)];
        member.guild.channels.find("name", "discuţii").send(member.toString() + " " + WelcomeMessage);

      } else return;
  })
  .catch(collected => {
      console.log(`Only ${collected.size} out of 4 reacted.`);
      msg.delete();
  });
  
}

module.exports.help = {
  name: "verificare",
  type: "user",
  desc: "Verificăm dacă eşti o persoană fizică sau un robot.",
  usage: "verificare"
}
