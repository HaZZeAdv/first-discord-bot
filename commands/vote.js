const agree = "✅";
const disagree = "❎";

module.exports.run = async (bot, message, args) => {
    question = args.join(" ");
    if(!question) return;
    let putQuestion = await message.channel.send(`[ÎNTREBARE] ${question}`);
    let msg = await message.channel.send("Votează! (Ai 15 secunde la dispoziţie)");
    await msg.react(agree); 
    await msg.react(disagree);
    
    const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 15000});
    message.channel.send(`Rezultatul voturilor: \n\n${agree}: ${reactions.get(agree).count-1}${disagree}: ${reactions.get(disagree).count-1}`);
}

module.exports.help = {
    name: "vote",
    type: "admin",
    desc: "Supune la vot orice şi lasă serverul să decidă.",
    usage: "vote <question>"
}