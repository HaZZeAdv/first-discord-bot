const Discord = require("discord.js");
const Funct = require("../assets/functions.js");
const Logging = require('../assets/logging.js');
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return Funct.error(message, "Nu ai nivelul administrativ necesar.");
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    //>tempmute @user 1s/m/h/d

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(tomute.hasPermission("MANAGE_MESSAGES")) return Funct.error(message, "Nu pot să-i dau mute că e prea barosan.");
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
     if(!mutetime) return Funct.error(message, "Specifică timpul.");


     await(tomute.addRole(muterole.id));
     Logging.logUserMute(bot, message, `<@${tomute.id}>`, mutetime);

     setTimeout(function(){
        tomute.removeRole(muterole.id);
         Logging.logUserUnMute(bot, message, `<@${tomute.id}>`);
     }, ms(mutetime));

 }


module.exports.help = {
    name: "mute",
    type: "admin",
    desc: "Dă mute unui jucător în cazul în care vorbeşte porcos.",
    usage: "mute @mention"
}
