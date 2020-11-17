import { getRandomInt } from '../util/math'

module.exports = {
	name: ['Marty', 'marty' ],
	description: 'Marty',
	execute(message, args) {

        const imgLinks = [
            'https://imgur.com/YeDEWXb',
            'https://imgur.com/QzC0pQl'
        ];
        
        const image = imgLinks[getRandomInt(imgLinks.length)];
        message.channel.send(image);
	},
};

