module.exports = {
    name: ['raidbots', 'Raidbots', 'RaidBots'],
    description: 'Raidbots Account',
    execute(message, args) {
        message.channel.send(
            '**Email:** '+ process.env.RAIDBOTS_LOGIN + '\n' +
            '**Password:** ' + process.env.RAIDBOTS_PASSWORD 
        );
    },
};