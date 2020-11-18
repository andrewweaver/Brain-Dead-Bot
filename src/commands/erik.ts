import { getRandomInt } from '../util/math'

module.exports = {
	name: ['Erik', 'erik', 'Hairlong', 'hairlong', 'Mario', 'mario', 'Kaos', 'kaos'],
	description: 'Erik',
	execute(message, args) {
		const messages = [
			'Erik is petting Maya.',
			'https://imgur.com/zRQlWvb'
		]
		message.channel.send(messages[getRandomInt(messages.length)]);
	},
};