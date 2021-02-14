const ms = require('ms');

module.exports = {
    name: "reroll",
    description: "Type !reroll id",
    permission: "admin",

    async run (client, message, args){

        if(!message.member.roles.cache.some(role => role.name === this.permission)) return message.reply(`What did you expect you aren\'t ${this.permission}`);

        if(!args[0]) return message.channel.send('No giveaway ID provided');

        let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(" ")) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if(!giveaway) return message.channel.send('Couldn\'t find a giveaway with that ID/name');

        client.giveawaysManager.reroll(giveaway.messageID)
        .then(() => {
            message.channel.send('Giveaway rerolled')
        })
        .catch((e) => {
            if(e.startsWith(`Giveaway with ID ${giveaway.messageID} is not ended`)){
                message.channel.send('This giveaway hasn\'t ended yet')
            } else {
                console.error(e);
                message.channel.send('An error occured')
            }
        })
    }
}