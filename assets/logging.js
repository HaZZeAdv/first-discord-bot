const { log_channel } = require('./config.json');
const Discord = require('discord.js');
module.exports = {
    logUserBan: function(bot, user, guild) {
        this.getLoggingChannel(guild, function(loggingChannel) {
            loggingChannel.send(`:skull: **User Banned** :skull:
                                       \n**User**: ${user.username}`);   
        });            
    },

    logUserMute: function(bot, message, muted_user , time) {
        this.getLoggingChannel(message.guild, function(loggingChannel) {
            let i = message.member.id;
            let executor = bot.users.get(i).tag;
            let embed = new Discord.RichEmbed()
            .setAuthor("Mute", bot.user.avatarURL)
            .addField("Utilizator", muted_user)
            .addField("Executor", executor)
            .addField("Timp", time)
            .setColor("#ff6a00")
            .setThumbnail("http://icons.iconarchive.com/icons/graphicloads/polygon/128/sound-icon.png")
            .setTimestamp()

            loggingChannel.send(embed);
        });        
    },

    logUserUnMute: function(bot, message, muted_user) {
        this.getLoggingChannel(message.guild, function(loggingChannel) {
            let embed = new Discord.RichEmbed()
            .setAuthor("Un-Mute", bot.user.avatarURL)
            .addField("Utilizator", muted_user)
            .setColor("#ff6a00")
            .setThumbnail("http://icons.iconarchive.com/icons/graphicloads/polygon/128/sound-icon.png")
            .setTimestamp()

            loggingChannel.send(embed);
        });        
    },


    logMessageDelete: function(bot, message) {
        this.getLoggingChannel(message.guild, function(loggingChannel) {
            let i = message.member.id;
            let executor = bot.users.get(i).tag;
            let embed = new Discord.RichEmbed()
            .setAuthor("Mesaj şters | " + message.channel.name, bot.user.avatarURL)
            .addField("Mesaj:", message.content)
            .addField("Trimis de", message.author.tag)
            .addField("Şters de", executor)
            .setColor("#ff6a00")
            .setThumbnail("http://icons.iconarchive.com/icons/graphicloads/polygon/128/bin-icon.png")
            .setTimestamp()

            loggingChannel.send(embed);
        });        
    },

    logGuardianMessageDelete: function(bot, message) {
        this.getLoggingChannel(message.guild, function(loggingChannel) {
            let embed = new Discord.RichEmbed()
            .setAuthor("Securitate | " + message.channel.name, bot.user.avatarURL)
            .addField("Mesaj şters:", message.content)
            .addField("Trimis de", message.author.tag)
            .setColor("#ff6a00")
            .setThumbnail("http://icons.iconarchive.com/icons/graphicloads/polygon/128/shield-icon.png")
            .setTimestamp()

            loggingChannel.send(embed);
        });        
    },

    logReportSolved: function(bot, message, reporter, solvedby) {
        this.getLoggingChannel(message.guild, function(loggingChannel) {
            let embed = new Discord.RichEmbed()
            .setAuthor("Raport rezolvat | " + message.channel.name, bot.user.avatarURL)
            .addField("Trimis de", reporter)
            .addField("Rezolvat de:", solvedby)
            .setColor("#ff6a00")
            .setThumbnail("http://icons.iconarchive.com/icons/graphicloads/polygon/128/shield-icon.png")
            .setTimestamp()

            loggingChannel.send(embed);
        });        
    },

    getLoggingChannel: function(guild, callback){                
        var loggingChannel = guild.channels.find('name', log_channel);
                
        if(loggingChannel == null){
            var plebRoles = guild.roles.filter(x => x.hasPermission('MANAGE_MESSAGES'));
            var roleArray = [];
            for(var role of plebRoles){
                var override = {
                    id: role[0],
                    type: 'role',
                    allow: 1024,
                    deny: 2048
                };
                roleArray.push(override);
            }
            roleArray.push({
                id: guild.id,
                type: 'role',
                deny: 3072
            });

            console.log(roleArray);
            guild.createChannel(log_channel, 'text', roleArray)
            .then(newChannel => callback(newChannel))
            .catch(console.error);
        }
        else {
            callback(loggingChannel);
        }                   
    }
}