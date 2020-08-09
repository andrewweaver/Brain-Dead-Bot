const Discord = require("discord.js");
const client = new Discord.Client();
require('dotenv').config()

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} using token: ${DISCORD_BOT_TOKEN}`)
})

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(DISCORD_BOT_TOKEN);