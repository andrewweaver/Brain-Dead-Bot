import { getWoWCharacterDetails, getWoWCharacterImageURL } from '../api/blizzard/battlenet';
import { getRaiderIODetails, raids } from '../api/raiderio/raiderio';
import { getClassColor } from '../util/colors'
const moment = require('moment-timezone');
const Discord = require("discord.js");

const DATE_FORMAT = 'MMMM Do YYYY, h:mm a'

module.exports = {
	name: 'character',
	description: 'Get details about a WoW character',
	async execute(message, args) {
        try {
            let character = await getWoWCharacterDetails(args[0], args[1]);
            let avatar = await getWoWCharacterImageURL(args[0], args[1]);
            let raiderIO = await getRaiderIODetails(args[0], args[1])

            console.info('Battle.net API: ' + JSON.stringify(character))
            console.info('RaiderIO API: ' + JSON.stringify(raiderIO))
    
            const embed = new Discord.MessageEmbed()
                .setColor(getClassColor(character.character_class.name))
                .setAuthor(`${character.name} ${character.guild ? '| <' + character.guild.name + '>' : ''}`, 
                    "https://blznav.akamaized.net/img/games/logo-wow-3dd2cfe06df74407.png", 
                    `https://worldofwarcraft.com/en-us/character/us/${character.realm.slug.toLowerCase()}/${character.name.toLowerCase()}`)
                .setThumbnail(avatar.avatar_url)
                .setDescription(
                    `[Warcraft Logs](https://www.warcraftlogs.com/character/us/${character.realm.slug.toLowerCase()}/${character.name.toLowerCase()}) | ` +
                    `[Raider IO](https://raider.io/characters/us/${character.realm.slug.toLowerCase()}/${character.name.toLowerCase()}) | ` +
                    `[WoW Progress](https://www.wowprogress.com/character/us/${character.realm.slug.toLowerCase()}/${character.name.toLowerCase()}) \n` +
                    `**Avg. ilvl:** ${character.average_item_level} | **Equipped ilvl:** ${character.equipped_item_level}`
                )
                .setTimestamp()

                // Add Raid history
                raids.forEach(raid => {
                    let achievement = getAchievementDate(raid.slug, raiderIO.raid_achievement_curve)
                    if (achievement) {
                        embed.addField(raid.name, `${raiderIO.raid_progression[raid.slug].summary} - ${getAchievementDate(raid.slug, raiderIO.raid_achievement_curve)}`);
                    } else {
                        embed.addField(raid.name, `${raiderIO.raid_progression[raid.slug].summary}`);
                    }
                })

                // Add current mythic plus numbers
                if (raiderIO.mythic_plus_scores_by_season.length > 0){
                    embed.addField("Mythic +", getMythicPlusRankings(raiderIO.mythic_plus_scores_by_season[0]))
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

// Get the formatted date for completion of AOTC/CE
const getAchievementDate = (slug, raidAchievements) => {
    for (let i=0; i < raidAchievements.length; i++){
        if (raidAchievements[i].raid === slug){
            if (raidAchievements[i].cutting_edge) {
                let achievement = moment.utc(raidAchievements[i].cutting_edge).tz("America/New_York").format(DATE_FORMAT)
                return ` **[CE]** - *${achievement}*`;
            }
                
            if (raidAchievements[i].aotc) {
                let achievement = moment.utc(raidAchievements[i].aotc).tz("America/New_York").format(DATE_FORMAT)
                return ` **[AoTC]** - *${achievement}*`;
            }
                
        }
    }
}

// Get the formatted string for RaiderIO mythic plus scores
const getMythicPlusRankings = (season_rankings) => {
    let rankingString = `**Overall:** *${season_rankings.scores.all}* `;
    if (season_rankings.scores.dps > 0) {
        rankingString += `| **DPS:** *${season_rankings.scores.dps}* `;
    }
    if (season_rankings.scores.tank > 0) {
        rankingString += `| **Tank:** *${season_rankings.scores.tank}* `;
    }
    if (season_rankings.scores.healer > 0) {
        rankingString += `| **Healer:** *${season_rankings.scores.healer}* `;
    }
    return rankingString;
}