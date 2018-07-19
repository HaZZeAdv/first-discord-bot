
module.exports.run = async (bot, message, args) => {
    const dice = [1,2,3,4,5,6];
    let roll = dice[Math.floor(Math.random()*dice.length)];
    await message.channel.send(`${message.author} a aruncat un ${roll}.`);
}

module.exports.help = {
name: "dice",
type: "fun",
desc: "Dă cu zaurl 6-5 n-ai nevoie de servici.",
usage: "dice"
}