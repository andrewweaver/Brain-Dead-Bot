import {getClassColor} from './util/colors'
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
    if (Array.isArray(command.name)){
        let commands = command.name;
        commands.forEach(prefix => {
            console.log(prefix)
            Client.commands.set(prefix, command)
        });
    } else {
        Client.commands.set(command.name, command)
    }
}

// When the Discord bot is started, print confirmation message
Client.once('ready', () => {
    console.log(`Logged in as ${Client.user.tag} using token: ${DISCORD_BOT_TOKEN}`)
})

// Handle all of the message requests from Discord
Client.on('message', (message) => {
    if (!message.content.startsWith(BOT_COMMAND_PREFIX)) {
        if (message.author.bot) return;
      
        // Troll Rye
        // 138809921528528896
        // if (message.author.id == 138809921528528896){
        //     const emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'rye');
        //     message.react(emoji)
        //         .catch((error) => {
        //             console.log(error)
        //             message.delete();
        //         })
        //     if (message.content.includes("<@!136615654701793280>")){
        //         message.delete();
        //         message.reply('You cannot ping that person, they are too important for you.')
        //     }
        // }

        // Troll Luke
        // if (message.author.id == 136615654701793280){
        //     const z = message.guild.emojis.cache.find(emoji => emoji.name === 'regional_indicator_z');
        //     const i = message.guild.emojis.cache.find(emoji => emoji.name === 'regional_indicator_i');
        //     const n = message.guild.emojis.cache.find(emoji => emoji.name === 'regional_indicator_n');
        //     const g = message.guild.emojis.cache.find(emoji => emoji.name === 'regional_indicator_g');
        //     message.react(z)
        //         .then(message.react(i)
        //         .then(message.react(n)
        //         .then(message.react(g)
        //     )));
        // }
        return;
    }
    // Destructure the message into a command and it's arguments
    const args = message.content.slice(BOT_COMMAND_PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Check to see if the command exists
    if (Client.commands.get(command)){
        // Execute the command
        try {
            Client.commands.get(command).execute(message, args);
        } catch (error) {
            message.reply('```' + error + '```');
        }
        
    } else {
        // Command doesn't exist, notify message sender of invalid command
        message.reply("I don't recognize that command.");
    }
});

// Start the Discord Bot
export const startDiscordBot = async () => { await Client.login(DISCORD_BOT_TOKEN); };

// Send the guild application to Discord
export const sendGuildApplicationToDiscord = async (application) => {
    const APPLICATION_CHANNEL = process.env.DISCORD_APPLICATION_CHANNEL;
    try {
        let channel = await getChannelById(APPLICATION_CHANNEL)
        if (!channel) throw new Error('Unable to find the Discord channel');
        const embed = new Discord.MessageEmbed()
            .setColor('#000000')
            .setTimestamp()
        for (let i = 0; i < application.length; i++) {
            embed.addField( application[i].question, application[i].answer)
            if (application[i].question == "What class is your main character you are applying with?"){
                embed.setColor(getClassColor(application[i].answer))
            }
        }
        let message = await channel.send(embed);
        await message.react("👍");
        await message.react("👎")
    } catch (error){
        console.log(error)
    }
}

// Send the guild complaing to Discord
export const sendGuildComplaintToDiscord = async (complaint) => {
    const COMPLAINT_CHANNEL = process.env.DISCORD_COMPLAINT_CHANNEL;
    try {
        let channel = await getChannelById(COMPLAINT_CHANNEL)
        if (!channel) throw new Error('Unable to find the Discord channel');
        const embed = new Discord.MessageEmbed()
            .setColor('#000000')
            .setTimestamp()
        for (let i = 0; i < complaint.length; i++) {
            embed.addField( complaint[i].question, complaint[i].answer)
        }
        await channel.send(embed);
    } catch (error){
        console.log(error)
    }
}

const getChannelById = async (channelId) => {
    return await Client.channels.fetch(channelId)
}