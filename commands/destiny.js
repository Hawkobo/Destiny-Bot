const fetch = require('node-fetch');
const { key } = require('./../api.json');

module.exports = {
	name: 'destiny',
	description: 'Returns Bungie membership ID',
	args: true,
	usage: '<Battletag ID>',

	async execute(message, args) {
	var url = 'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/' + encodeURIComponent(args[0])
	var headers = {
		"X-API-KEY": key
	}
	var answer;

	await fetch( url, { headers: headers })
		.then(response => response.json())
			.then(data => answer = data)
			// .then(json => message.channel.send(json.Response[0].membershipId))

	message.channel.send(answer.Response[0].membershipId)
	},
};
