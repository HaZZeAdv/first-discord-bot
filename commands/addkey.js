
module.exports.run = async (bot, message, args) => {
    if(args.length < 1) return;
    if(message.member.roles.some(r=>["Şefu' ăla blanao", "Pizdar", "Şefu' la bani"].includes(r.name)) ) {
        key = args.join(" ");
        message.member.guild.channels.find("name", "giveaways").send("@everyone " + key);
    }
    message.delete();
}
module.exports.help = {
    name: "addkey",
    type: "admin",
    desc: "Adaugi un text la canalul #Giveaways.",
    usage: "addkey <text>"
}
