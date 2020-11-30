import { getRandomInt } from '../util/math'
module.exports = {
    name: ['Loons', 'loons', 'Duhbloons', 'duhbloons', 'Peter', 'peter', 'pj', 'PJ', 'Deeps', 'deeps' ],
	description: 'Peter',
	execute(message, args) {
		const messages = [
			'Peter is a pretty fucking cool guy.',
			'https://imgur.com/BsMx8AT'
		]
		message.channel.send(messages[getRandomInt(messages.length)]);
	},
};