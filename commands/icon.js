module.exports.run = async (bot, message, args) => {
    let msg = await message.channel.send("Amu' caut poza'...");
    
    if(!message.guild.iconURL) return msg.edit("Serverul nu are poza.");
    await message.channel.send({files: [
        {
            attachment: message.guild.iconURL,
            name: "icon.png"
        }
    ]});
    
    msg.delete();
}

module.exports.help = {
    name: "icon",
    type: "user",
    desc: "Arată imaginea serverului.",
    usage: "icon"
}