const fetch = require('node-fetch');
const { key } = require('./../api.json');

module.exports = {
	name: 'destiny',
	description: 'Returns user ID',

	execute(message, args) {
	var url = 'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/Hawkobo%231616'
	var headers = {
		"X-API-KEY": key
	}

	fetch( url, { headers: headers })
		.then(response => response.json())
			.then(json => message.channel.send(json.Response[0].displayName))
	},
};
