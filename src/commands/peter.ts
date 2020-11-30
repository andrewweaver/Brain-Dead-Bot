import { getRandomInt } from '../util/math'
module.exports = {
    name: ['Loons', 'loons', 'Duhbloons', 'duhbloons', 'Peter', 'peter', 'pj', 'PJ', 'Deeps', 'deeps' ],
	description: 'Peter',
	execute(message, args) {
		const messages = [
			'Peter is a pretty fucking cool guy.',
			'https://cdn.discordapp.com/attachments/528397748626653184/778284606176624670/20200711_151115.gif'
		]
		message.channel.send(messages[getRandomInt(messages.length)]);
	},
};