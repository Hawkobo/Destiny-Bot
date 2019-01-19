var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var api = require('./api.json');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            // !test
            case 'test':
                bot.sendMessage({
                    to: channelID,
                    message: 'Hello ' + user + '!'
                });
            break;
            // !destiny
            case 'destiny':
                var xhr = new XMLHttpRequest();
                var responseObject;
                xhr.onload = function() {
                    if (this.status = 200)
                        responseObject = JSON.parse(this.responseText);
                    if (this.status = 400)
                        bot.sendMessage({
                          to: channelID,
                          message: 'Bad Request'
                        })
                }
                xhr.open('GET', 'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/SteveHybrid%231406/', false);
                xhr.setRequestHeader(api.key, api.value);
                xhr.send();
                    bot.sendMessage({
                        to: channelID,
                        message: responseObject.Response[0]
                    });

            break;
            // Just add any case commands if you want to..
         }
     }
});
