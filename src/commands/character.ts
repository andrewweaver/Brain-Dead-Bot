import { getWoWCharacterDetails, getWoWCharacterImageURL } from '../util/battlenet';
import { getRaiderIODetails, raids } from '../util/raiderio';
import { startDiscordBot } from '../discord';
import { Colors } from '../util/colors'
const Discord = require("discord.js");

module.exports = {
	name: 'character',
	description: 'Get details about a WoW character',
	async execute(message, args) {

        let character = await getWoWCharacterDetails(args[0], args[1]);
        let avatar = await getWoWCharacterImageURL(args[0], args[1]);
        let raiderIO = await getRaiderIODetails(args[0], args[1])

        const embed = new Discord.MessageEmbed()
            .setColor(getClassColor(character.character_class.name))
            .setAuthor(`${character.name} | ${character.race.name} | ${character.character_class.name}`, 
                "https://blznav.akamaized.net/img/games/logo-wow-3dd2cfe06df74407.png", 
                `https://worldofwarcraft.com/en-us/character/us/${character.realm.name.toLowerCase()}/${character.name.toLowerCase()}`)
            .setThumbnail(avatar.avatar_url)
            .setDescription(
                `[Warcraft Logs](https://www.warcraftlogs.com/character/us/${character.realm.name.toLowerCase()}/${character.name.toLowerCase()}) | ` +
                `[Raider IO](https://raider.io/characters/us/${character.realm.name.toLowerCase()}/${character.name.toLowerCase()}) | ` +
                `[WoW Progress](https://www.wowprogress.com/character/us/${character.realm.name.toLowerCase()}/${character.name.toLowerCase()}) \n` +
                `**Avg. ilvl:** ${character.average_item_level} | **Equipped ilvl:** ${character.equipped_item_level}`
            );

            raids.forEach(raid => {
                embed.addField(raid.name, `${raiderIO.raid_progression[raid.slug].summary} - ${getAchievementDate(raid.slug, raiderIO.raid_achievement_curve)}`);
            })
            
        //message.channel.send('`' + JSON.stringify(characterProfile)+ '`');
        message.channel.send(embed);
	},
};

const getClassColor = (charClass) => {
    let ClassColor = new Colors();
    switch (charClass) {
        case 'Death Knight':
            return ClassColor.DEATH_KNIGHT;
            break;
        case 'Demon Hunter':
            return ClassColor.DEMON_HUNTER;
            break;
        case 'Druid':
            return ClassColor.DRUID;
            break;
        case 'Hunter':
            return ClassColor.HUNTER;
            break;
        case 'Mage':
            return ClassColor.MAGE;
            break;
        case 'Monk':
            return ClassColor.MONK;
            break;
        case 'Paladin':
            return ClassColor.PALADIN;
            break;
        case 'Priest':
            return ClassColor.PRIEST;
            break;
        case 'Rogue':
            return ClassColor.ROGUE;
            break;
        case 'Shaman':
            return ClassColor.SHAMAN;
            break;
        case 'Warlock':
            return ClassColor.WARLOCK;
            break;
        case 'Warrior':
            return ClassColor.WARRIOR;
            break;
        default:
            return "#161616"
    }
};

const getAchievementDate = (slug, raidAchievments) => {
    for (let i=0; i < raidAchievments.length(); i++){
   
    }
    // return raidAchievments.forEach(achievement => {
    //     if (achievement.raid == slug){
    //         console.log(achievement)
    //         if (achievement.cutting_edge){
    //             console.log('CE')
    //             return achievement.cutting_edge;
    //         }
    //         if (achievement.aotc){
    //             console.log("AOTC")
    //             return achievement.aotc;
    //         }
    //         return;
    //     }
    // })
}