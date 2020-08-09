const Discord = require("discord.js");
const client = new Discord.Client();
require('dotenv').config()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

console.log(process.env.DISCORD_BOT_TOKEN);

client.login(process.env.DISCORD_BOT_TOKEN);