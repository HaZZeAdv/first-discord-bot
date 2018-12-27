// Variables
const Discord = require('discord.js');
const fs = require("fs");
const { TOKEN, PREFIX, locked_channel, newbie_channel } = require('./assets/config.json');
const {bannedWords} = require('./assets/variables.js');
const Logging = require('./assets/logging.js');
const Funct = require('./assets/functions.js');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// Command Handler
fs.readdir("./commands/", (err, files) => {
    if(err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    console.log(`[COMMANDS] ${jsfiles.length} comenzi au fost incarcate.`);
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.help.name, props);
    });
});

// Bot connection
bot.on('ready', () => {
    bot.user.setPresence({ game: { name: 'Fuego - Colinde', type: 3 } });//Watching 
    bot.user.setStatus('dnd');
    console.log(`[SYSTEM] La cum arata totul, presupun ca ai reusit.`);
});

// Messages
bot.on("message", async message => {
    if(message.author.bot) return undefined;
    if(message.channel.type === "dm") return undefined;
    const agree = "✅";
    let messageArray = message.content.toLowerCase().split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    // Delete message from locked_channel.
    if(message.channel.name == locked_channel || message.channel.name == newbie_channel) {
        if(isNaN(message.content)) {
            message.delete();
        }
    }

    // Banned words log
    if(bannedWords.some(word => message.content.includes(word)) ) {
        message.delete();
        Logging.logGuardianMessageDelete(bot, message);
    }

    // Custom Prefix
    let prefixes = JSON.parse(fs.readFileSync("assets/serverPrefixes.json", "utf8"));
    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: PREFIX
        };
    }
    let prefix = prefixes[message.guild.id].prefixes;

    // Command Executor
    if(command.startsWith(prefix)) {
        let cmd = bot.commands.get(command.slice(prefix.length));
        if(args.length < 1) Funct.SendUsage(bot, message, command.slice(prefix.length));
        if(cmd) cmd.run(bot, message, args);
    }
});

// Deleted message log
bot.on('messageDelete', async (message) => {
    if(bannedWords.some(word => message.content.includes(word))) return;
    if(message.content.includes("report")) return;
    if(message.content.includes("Aşteaptă")) return;
    if(message.channel.name == locked_channel || message.channel.name == newbie_channel) return;
    Logging.logMessageDelete(bot, message);
});

// Login
bot.login(process.env.BOT_TOKEN);
