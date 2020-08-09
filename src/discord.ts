const Discord = require("discord.js");
const client = new Discord.Client();
import { handleDiscordMessage } from './discord/message-handler';
require('dotenv').config()

// Discord token, stored as an environment variable
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

// Handle all of the message requests from Discord
client.on('message', handleDiscordMessage);

// When the Discord bot is started, print confirmation message
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} using token: ${DISCORD_BOT_TOKEN}`)
})

// Start the Discord Bot
export const startDiscordBot = async () => { client.login(DISCORD_BOT_TOKEN); };