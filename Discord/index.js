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
client.on('message', message => {  
    
    if (message.author == client.user){
        return
    }
    if(message.content.startsWith("F")){
        let lower = message.content.toLowerCase()
        let fullCommand = lower.substr(2) //nombre de caractere + espace
        let splitCommand = fullCommand.split(" ")
        let primaryCommand = splitCommand[0]
        let arguments = splitCommand.slice(1)


        //forEach(primaryCommand => require(`./commands/${primaryCommand}`))
        if(MesFonctions[primaryCommand]){
            return MesFonctions[primaryCommand](arguments, message, client, primaryCommand)
        }
        else
            return message.channel.send("``Oups... je pense que tu t'es tromper``")
    }
})
 
client.login(TOKEN);