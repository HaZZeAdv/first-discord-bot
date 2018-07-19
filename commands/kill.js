module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first();
    let author = message.author;

    const weapons = [
        "cuţitul",
        "cizma",
        "lopata",
        "penisul",
        "un pistol",
        "super puterile lui",
        "mâinile goale",
        "mitraliera (RATATATATA)",
        "un creion"
    ];
    let weapon = weapons[Math.floor(Math.random()*weapons.length)];
    
    await message.channel.send(`${target} a fost omorât de ${author} cu ${weapon}.`);
}

module.exports.help = {
    name: "kill",
    type: "fun",
    desc: "Omoară un jucător cu un obiect random.",
    usage: "kill <@mention>"
}