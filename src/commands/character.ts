import { getWoWCharacterDetails, getWoWCharacterImageURL } from '../api/blizzard/battlenet';
import { getRaiderIODetails, raids } from '../api/raiderio/raiderio';
import { getClassColor } from '../util/colors'
import { getMythicPlusRankings, getAchievementDate, getPrettyRaidName } from '../api/raiderio/raiderio'
const Discord = require("discord.js");

module.exports = {
	name: ['character', 'char' ],
	description: 'Get details about a WoW character',
	async execute(message, args) {
        try {
            let character = await getWoWCharacterDetails(args[0], args[1]);
            let avatar = await getWoWCharacterImageURL(args[0], args[1]);
            let raiderIO = await getRaiderIODetails(args[0], args[1])

            console.info('Battle.net API: ' + JSON.stringify(character))
            console.info('RaiderIO API: ' + JSON.stringify(raiderIO))
    
            const embed = new Discord.MessageEmbed()
                .setColor(
                    getClassColor(character.character_class.name)
                )
                .setAuthor(
                    `${character.name} ${character.guild ? '| <' + character.guild.name + '>' : ''}`, 
                    "https://blznav.akamaized.net/img/games/logo-wow-3dd2cfe06df74407.png", 
                    `https://worldofwarcraft.com/en-us/character/us/${character.realm.slug.toLowerCase()}/${character.name.toLowerCase()}`
                )
                .setThumbnail(avatar.avatar_url)
                .setDescription(
                    `[Warcraft Logs](https://www.warcraftlogs.com/character/us/${character.realm.slug.toLowerCase()}/${character.name.toLowerCase()}) | ` +
                    `[Raider IO](https://raider.io/characters/us/${character.realm.slug.toLowerCase()}/${character.name.toLowerCase()}) | ` +
                    `[WoW Progress](https://www.wowprogress.com/character/us/${character.realm.slug.toLowerCase()}/${character.name.toLowerCase()}) \n` +
                    `**Avg. ilvl:** ${character.average_item_level} | **Equipped ilvl:** ${character.equipped_item_level}`
                )
                .setTimestamp()

                // Add Current Progression
                embed.addField("\u200b", "Current Progression");
                embed.addField('Castle Nathria', raiderIO.raid_progression['castle-nathria'].summary)
                
                embed.addField('\u200b', 'Raid Achievements');

                // Add Raid history
                raiderIO.raid_achievement_curve.forEach(raid => {
                    embed.addField(getPrettyRaidName(raid.raid), getAchievementDate(raid.raid, raiderIO.raid_achievement_curve))
                })

              
                embed.addField('\u200b', 'Mythic Dungeons');
                // Add current mythic plus numbers
                if (raiderIO.mythic_plus_scores_by_season.length > 0){
                    embed.addField("Raider IO Score", getMythicPlusRankings(raiderIO.mythic_plus_scores_by_season[0]))
                }

            // Send the message
            message.channel.send(embed);
        }
        catch (error) {
            console.error(error);
            message.reply("That character doesn't exist on the armory")
        }
	},
};

