module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Amu' îţi caut avataru'...");
    let target = message.mentions.users.first() || message.author;
    
    await message.channel.send({files: [
        {
            attachment: target.displayAvatarURL,
            name: "avatar.png"
        }
    ]});
    
    msg.delete();
}

module.exports.help = {
    name: "avatar",
    type: "user",
    desc: "Arată avatarul tău sau al persoanei menţionate.",
    usage: "avatar <@mention>"
}
