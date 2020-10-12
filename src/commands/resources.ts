module.exports = {
    name: 'resources',
    description: 'Guild Resources',
    execute(message, args) {
        message.channel.send(
            '**Spreadsheet:** https://shorturl.at/enzBF \n' +
            '**Warcraft Logs:** https://shorturl.at/iCJKL \n' +
            '**Application:** https://shorturl.at/nxGIX \n' +
            '**Complaints:** https://shorturl.at/bdoGM ';
        );
    },
};
