const fetch = require('node-fetch');
const { key } = require('./../api.json');

module.exports = {
	name: 'throne',
	description: 'Checks if you have cleared Shattered Throne flawlessly...alone.',
  args: true,
  usage: '<Battlenet ID>',

	async execute(message, args) {
  var url = 'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/' + encodeURIComponent(args[0])
	var headers = {
		"X-API-KEY": key
	}

	await fetch( url, { headers: headers })
		.then(response => response.json())
      .then(data => membershipId = data)

  var throne = 'https://www.bungie.net/Platform/Destiny2/4/Profile/' + membershipId.Response[0].membershipId + '/?components=900'
  var clear

  await fetch (throne, { headers: headers })
    .then(response => response.json())
      .then(data => clear = data)

  if (clear.Response.profileRecords.data.records[1290451257].objectives[0].complete)
    message.channel.send("You cleared it! Good job!")
  else
    message.channel.send("Sorry! You haven't cleared it yet!")

	},
};
