const express = require('express');
const app = express();
require('dotenv').config()

const HTTP_SERVER_PORT = process.env.HTTP_SERVER_PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

export const startHttpServer = async () => {
    app.listen(HTTP_SERVER_PORT, () => {
        console.log(`Web server listening on port ${HTTP_SERVER_PORT}`)
    })
};