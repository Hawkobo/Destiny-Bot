module.exports = {
	name: 'test-name',
	description: 'Hello ${name}!',
	args: true,
	usage: '<Name>',
	
	execute(message, args) {
		message.channel.send('Hello ' + args[0] + '!');
	},
};
