const fetch = require('node-fetch');
const moment = require('moment-timezone');
require('dotenv').config();

const DATE_FORMAT = 'MMMM Do YYYY, h:mm a'

export const getRaiderIODetails = async(character, realm = 'Thrall') => {
    try {
        let url = `https://raider.io/api/v1/characters/profile?region=us&realm=${realm.toLowerCase()}&name=${character.toLowerCase()}&fields=raid_progression,mythic_plus_scores_by_season:current,raid_achievement_curve${getRaidSlugString()}`
        const request = await fetch(url);
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error)
    }
}

const getRaidSlugString = () => {
    let slugString = "";
    raids.forEach(raid => {
        slugString += ':' + raid.slug;
    })
    return slugString;
}

// Get the formatted date for completion of AOTC/CE
export const getAchievementDate = (slug, raidAchievements) => {
    
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
export const getMythicPlusRankings = (season_rankings) => {
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

export const raids = [
    { name: "Uldir", slug: "uldir" },
    { name: "Crucible of Storms", slug: "crucible-of-storms" },
    { name: "Battle of Dazar'alor", slug: "battle-of-dazaralor" },
    { name: "The Eternal Palace", slug: "the-eternal-palace" },
    { name: "Ny'alotha the Waking City", slug: "nyalotha-the-waking-city"}
]