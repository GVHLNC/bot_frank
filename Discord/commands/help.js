const { MessageEmbed } = require("discord.js")
const { readdirSync } = require("fs")
const { COLOR } = require("../config.json");
module.exports = {
  name: "help",
  description: "Get all commands name and description",
  permission: "everyone",
  async run(client, message, args) {    
    
    let embed = new MessageEmbed()
    .setAuthor("HELP SECTION", client.user.displayAvatarURL())
    .setThumbnail(client.user.displayAvatarURL())
    .setColor(COLOR)
    .setDescription(`These are the command of ${client.user.username} Bot`)
    let command = readdirSync("./commands")

      if(args[0] == null)
        args[0] = "everyone"

      for(let i = 0; i < command.length; i++) {
        const cmd = client.commands.get(command[i].replace(".js", ""))
        if(args[0] == cmd.permission) 
            embed.addField(`**${cmd.name}**`, cmd.description, true)
        
      }
      
      message.channel.send(embed)

  }
}