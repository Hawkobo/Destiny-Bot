const fetch = require('node-fetch');
const { key } = require('./../api.json');

module.exports = {
	name: 'destiny',
	description: 'Returns user ID',

	execute(message, args) {
	var url = 'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/Hawkobo%231616'
	var headers = {
		"X-API-KEY": "561d624e6159478ba2012d98eb9db10c"
	}

	fetch( url, { headers: headers })
		.then(response => response.json())
			.then(json => message.channel.send(json.Response[0].displayName))
	},
};
