module.exports = {
    name: 'resources',
    description: 'Guild Resources',
    execute(message, args) {
        message.channel.send(
            '**Spreadsheet:** <https://shorturl.at/enzBF> \n' +
            '**Warcraft Logs:** <https://shorturl.at/eALPY> \n' +
            '**WoW Audit:** <https://shorturl.at/prxQ9> \n' +
            '**Application:** <https://shorturl.at/nxGIX> \n' +
            '**Complaints:** <https://shorturl.at/bdoGM>'
        );
    },
};
