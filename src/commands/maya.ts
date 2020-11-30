import { getRandomInt } from '../util/math'

module.exports = {
	name: ['Maya', 'maya' ],
	description: 'Maya',
	execute(message, args) {
		const messages = [
			'https://imgur.com/tRKZhmj',
      'https://imgur.com/U5CSdWk',
      'https://imgur.com/THeTEP9'
		]
		message.channel.send(messages[getRandomInt(messages.length)]);
	},
};