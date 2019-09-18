const { prefix, token } = require('./config.json');
const Discord = require('discord.js');

const bot = new Discord.Client();

bot.once("ready", () => {
  console.log('Hawkobot is online!');
  bot.user.setGame("on Destiny!")
});

bot.on("message", message => {
  console.log(message.content);
  if (message.content === `${prefix}ping`) {
	message.channel.send('Pong.');
} else if (message.content === `${prefix}beep`) {
	message.channel.send('Boop.');
}
});

bot.login(token);
