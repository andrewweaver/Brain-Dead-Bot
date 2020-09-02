const fetch = require('node-fetch');
const btoa = require('btoa');
require('dotenv').config();

// Read environment variables for client id and secret to generate auth token
const BATTLENET_BASE_URL = process.env.BATTLENET_BASE_URL;
const BATTLENET_CLIENT_ID = process.env.BATTLENET_CLIENTID;
const BATTLENET_SECRET = process.env.BATTLENET_SECRET;

// Battle.net Authentication Token
let AUTH_TOKEN;

// Generate OAuth token for Battle.net API
const generateAuthToken = async () => {
    const request = await fetch('https://us.battle.net/oauth/token', {
        "method": "POST",
        "headers": {
            "Authorization": "Basic " + btoa(BATTLENET_CLIENT_ID + ":" + BATTLENET_SECRET),
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "max-age=0"
        },
        "body": "grant_type=client_credentials"
    });
    const response = await request.json();
    AUTH_TOKEN = response.access_token;
    return response.access_token;
}

export const getWoWCharacterDetails = async(character, realm = 'Thrall') => {
    if (!AUTH_TOKEN)
        await generateAuthToken();
    
    try {
        const request = await fetch(`${BATTLENET_BASE_URL}/profile/wow/character/${realm.toLowerCase()}/${character.toLowerCase()}?namespace=profile-us&locale=en_US&access_token=${AUTH_TOKEN}`);
        if (request.status > 400){
            AUTH_TOKEN = null;
            this.getWoWCharacterDetails(character, realm);
        }
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const getWoWCharacterImageURL = async(character, realm = 'Thrall') => {
    if (!AUTH_TOKEN)
        await generateAuthToken();
    
    try {
        const request = await fetch(`${BATTLENET_BASE_URL}/profile/wow/character/${realm.toLowerCase()}/${character.toLowerCase()}/character-media?namespace=profile-us&locale=en_US&access_token=${AUTH_TOKEN}`);
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error)
    }
}



