const fetch = require('node-fetch');
require('dotenv').config();

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

export const raids = [
    { name: "Uldir", slug: "uldir" },
    { name: "Crucible of Storms", slug: "crucible-of-storms" },
    { name: "Battle of Dazar'alor", slug: "battle-of-dazaralor" },
    { name: "The Eternal Palace", slug: "the-eternal-palace" },
    { name: "Ny'alotha the Waking City", slug: "nyalotha-the-waking-city"}
]