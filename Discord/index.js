const discord = require("discord.js")
const client = new discord.Client({ disableEveryone: true, disabledEvents: ["TYPING_START"] });
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json")

const { GiveawaysManager } = require('discord-giveaways');
const config = require("./config.json")
client.config = config;

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermission: ["mod"],
        embedColor: "#7289da",
        reaction: "🎉"
    }
})

//client events
client.on("ready", () => {
    console.log('Ready to serve');
    client.user.setActivity("!help | Frank");
})

client.on("warn", info => console.log(info));

client.on("error", console.error);

client.commands = new discord.Collection();
client.prefix = PREFIX;
client.queue = new Map();
client.vote = new Map();

// loading all files
const cmdFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"))
for (const file of cmdFiles) {
  const command = require(join(__dirname, "commands", file))
  client.commands.set(command.name, command)
} //end
 
// receving message
client.on("message", message => {
    if (message.author.bot) return;
    if (!message.guild) return;
   
    if(message.content.startsWith(PREFIX)) { //IF MESSSAGE STARTS WITH MINE BOT PREFIX
     
        const args = message.content.slice(PREFIX.length).trim().split(/ +/) //removing prefix from args
        const command = args.shift().toLowerCase();
        
        if(!client.commands.has(command)) {
        return;
        } 
        
        try  
        { //TRY TO GET COMMAND AND EXECUTE
            client.commands.get(command).run(client, message, args)
            //COMMAND LOGS
            console.log(`${message.guild.name}: ${message.author.tag} Used ${client.commands.get(command).name} in #${message.channel.name}`)
        } catch (err) { //IF IT CATCH ERROR
            console.log(err)
            message.reply("I am getting error on using this command")
        }
        
    }

});
 
client.login(TOKEN);