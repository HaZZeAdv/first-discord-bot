const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nu ai nivelul administrativ necesar.");
    if(!args[0]) return message.channel.send("Utilizare: **!mute @mention <time(s/m/h)>**");
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    //>tempmute @user 1s/m/h/d

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Pune-ţi ochelarii şi scrie un nume corect");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Ăla e barosan, nu pot şefule că mă bate.");
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "muted",
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
                });
            });

        }catch(e){
            console.log(e.stack);
        }
    }

     let mutetime = args[1];
     if(!mutetime) return message.reply("N-ai scris pentru cât timp.");


     await(tomute.addRole(muterole.id));
     message.channel.send(`<@${tomute.id}> a primit mute pentru ${ms(ms(mutetime), {long: true})}.`);

     setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> nu mai are mute.`);
     }, ms(mutetime));

 }


module.exports.help = {
    name: "mute"
}
