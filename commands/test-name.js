module.exports = {
	name: 'test-name',
	description: 'Hello ${name}!',
	execute(message, args) {
		message.channel.send('Hello ' + args[0] + '!');
	},
};
