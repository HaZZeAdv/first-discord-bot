var memes = require('dankmemes');
module.exports.run = async (bot, message, args) => {
 // var prefix = (file.prefix[message.guild.id] == undefined) ? file.prefix["default"] : file.prefix[message.guild.id];

 // console.log(`${message.author.username}` + " " + "Used The Command " + prefix + "memes");
  memes('all', 100, function(err, data) {
    var rand = Math.floor(Math.random() * 100);
    var test = data[rand];
    message.channel.send(test);
  });

}

module.exports.help = {
    name: "meme",
    type: "fun",
    desc: "Arată un meme random de pe reddit.",
    usage: "meme"
}
