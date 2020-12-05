module.exports = {
	name: ['Ryepizor', 'ryepizor', 'Rye', 'rye', 'Jon', 'jon'],
	description: 'Ryepizor',
	execute(message, args) {
		const emoji = message.guild.emojis.cache.find(emoji => emoji.name === 'rye');
		message.channel.send('Ehh.')
			.then(msg => {
				msg.react(emoji)
			});
	},
};
