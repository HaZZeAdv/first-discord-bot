const Discord = require("discord.js");
const fs = require("fs");
const Funct = require("../assets/functions.js")
module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_SERVER")) return Funct.error(message, "Nu ai gradul administrativ necesar.");
    if (args.length < 1) return;
    let prefixes = JSON.parse(fs.readFileSync("./assets/serverPrefixes.json", "utf8"));
    prefixes[message.guild.id] = {
        prefixes: args[0]
    };
    fs.writeFile("./assets/serverPrefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
    });
    Funct.say(message, "Prefix setat!", `Noul prefix: ${args[0]}`)
}

module.exports.help = {
    name: "setprefix",
    type: "secret",
    desc: "Schimbă prefixul botului.",
    usage: "setprefix <prefix>"
}