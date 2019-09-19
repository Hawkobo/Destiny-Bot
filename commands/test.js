module.exports = {
	name: 'test',
	description: 'The test worked!',
	
	execute(message, args) {
		message.channel.send('The test worked!');
	},
};
