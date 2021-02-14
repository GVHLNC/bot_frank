const { MessageEmbed } = require("discord.js")

module.exports = {
    name:"annonce",
    description:"annonce",
    permission: "admin",
    
    async run (client, message, args) {

        message.delete()

        if(!message.member.roles.cache.some(role => role.name === this.permission)) return message.reply(`What did you expect you aren\'t ${this.permission}`);

        let msg;
        let textChannel = message.mentions.channels.first()

        let now = new Date();
        let annee = now.getFullYear();
        let mois = (now.getMonth()+1);
        let jour = now.getDate();
        let heure = now.getHours();
        let minute = now.getMinutes();
        let seconde = now.getSeconds();

        const embed = new MessageEmbed()
            .setColor('#0099FF')
            .setFooter(jour + "/" + mois + "/" + annee + " a " + heure + "h " + minute + "m " + seconde + "s");

        

        if(textChannel) {
            embed.setAuthor(args[1])
            msg = args.slice(2).join(" ");
            embed.setDescription(msg)
            textChannel.send(embed)
        } else {
            embed.setAuthor(args[0])
            msg = args.slice(1).join(" ");
            embed.setDescription(msg)
            message.channel.send(embed)
        }
    }
}