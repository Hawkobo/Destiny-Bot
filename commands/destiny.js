const fetch = require('node-fetch');
const { key } = require('./../api.json');

module.exports = {
	name: 'destiny',
	description: 'Returns user ID',

	execute(message, args) {
	const { file } = fetch('https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/Hawkobo%231616', { method: 'GET', headers: {"X-API-KEY": "561d624e6159478ba2012d98eb9db10c"}}).then(response => response.json());

  message.channel.send(file);
	},
};
