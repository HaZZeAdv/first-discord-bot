module.exports.run = async (bot, message, args) => {
    if(args.length < 1) return;
    say = args.join(" ");
    message.channel.send(say);
    message.delete();
}

module.exports.help = {
    name: "say",
    type: "user",
    desc: "Fă botul să scrie ce scrii şi tu.",
    usage: "say <text>"
}
