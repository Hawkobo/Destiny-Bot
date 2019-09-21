module.exports = {
	name: 'test',
	description: 'Tests if bot is online',

	execute(message, args) {
		message.channel.send('The test worked!');
	},
};
