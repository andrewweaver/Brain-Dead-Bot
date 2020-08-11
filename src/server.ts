import {sendGuildApplicationToDiscord, sendGuildComplaintToDiscord} from './discord'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()

const HTTP_SERVER_PORT = process.env.HTTP_SERVER_PORT || 3000;

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/submit-guild-application", async (req, res) => {
    const application = req.body;
    await sendGuildApplicationToDiscord(application);
    res.sendStatus(200)
})

app.post("/submit-guild-complaint", async (req, res) => {
    const complaint = req.body;
    await sendGuildComplaintToDiscord(complaint);
    res.sendStatus(200)
})


export const startHttpServer = async () => {
    app.listen(HTTP_SERVER_PORT, () => {
        console.log(`Web server listening on port ${HTTP_SERVER_PORT}`)
    })
};