const Discord = require("discord.js");
const fs = require('fs');
require('dotenv').config()

// Discord token, stored as an environment variable
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN
const BOT_COMMAND_PREFIX = "!"

// Initialize the Discord client
const Client = new Discord.Client();

// Configure Discord commands
Client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    Client.commands.set(command.name, command)
}

// When the Discord bot is started, print confirmation message
Client.once('ready', () => {
    console.log(`Logged in as ${Client.user.tag} using token: ${DISCORD_BOT_TOKEN}`)
})

// Handle all of the message requests from Discord
Client.on('message', (message) => {
    if (!message.content.startsWith(BOT_COMMAND_PREFIX) || message.author.bot) return;

    // Destructure the message into a command and it's arguments
    const args = message.content.slice(BOT_COMMAND_PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Check to see if the command exists
    if (Client.commands.get(command)){
        // Execute the command
        Client.commands.get(command).execute(message, args);
    } else {
        // Command doesn't exist, notify message sender of invalid command
        message.reply("I don't recognize that command.");
    }
});

// Start the Discord Bot
export const startDiscordBot = async () => { await Client.login(DISCORD_BOT_TOKEN); };