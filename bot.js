var Discord = require('discord.io');
var logger = require('winston');
const auth = require('./config.json');
const api = require('./api.json');
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
    if (message.substring(0, 1) == auth.prefix) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);

        switch(cmd) {
            //!jojo
            case 'jojo':
                bot.sendMessage({
                  to: channelID,
                  message: 'Hello Jojo! I\'m working as intended!'
                })
                break;
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
                          message: json.Response[0].displayName + ', ' + json.Response[0].membershipId
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
            // !throne
            case 'throne':
                var profile = new XMLHttpRequest();
                var id = new XMLHttpRequest();

                var membershipId;

                id.onload = function() {
                    if (this.status == 200 && this.readyState == 4) {
                        var json = JSON.parse(this.responseText);
                        membershipId = json.Response[0].membershipId;
                        console.log(membershipId);
                    }
                    else {
                      bot.sendMessage({
                        to: channelID,
                        message: 'Bad Request, Error ' + this.status
                      })
                    }
                }

                profile.onload = function() {
                    if (this.status == 200 && this.readyState == 4) {
                        var json = JSON.parse(this.responseText);
                        if (json.Response.profileRecords.data.records[1290451257].objectives[0].complete == true)
                          bot.sendMessage({
                            to: channelID,
                            message: 'Congratulations! You\'ve done it solo!'
                          });
                        else {
                          bot.sendMessage({
                            to: channelID,
                            message: 'Sorry, you haven\'t solo\'d it quite yet.'
                          })
                        }
                    }
                    else
                        bot.sendMessage({
                          to: channelID,
                          message: 'Bad Request, Error ' + this.status
                        })
                }

                id.open("GET", "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/4/" + args[0], true);
                id.setRequestHeader("X-API-KEY", api.key);
                id.send();

                profile.open("GET", "https://www.bungie.net/Platform/Destiny2/4/Profile/" + membershipId + "/?components=900", true);
                profile.setRequestHeader("X-API-KEY", api.key);
                profile.send();
                break;
            //!anything else
            default:
                  bot.sendMessage({
                    to: channelID,
                    message: 'Invalid command!'
                  })
                  break;
         }
     }
});
