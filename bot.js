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

                xhr.onload = function() {
                   if (this.status == 200 && this.readyState == 4) {
                        var json = JSON.parse(this.responseText);
                        bot.sendMessage({
                          to: channelID,
                          message: json.Response[0].displayName
                        });
                    }
                    else
                        bot.sendMessage({
                          to: channelID,
                          message: 'Bad Request, Error ' + this.status
                        })
                  }

                  xhr.open("GET", "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/Hawkobo%231616/", true);
                  xhr.setRequestHeader("X-API-KEY", api.key);
                  xhr.send();
            break;
            // Just add any case commands if you want to..
         }
     }
});
