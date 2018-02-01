const TelegramBot = require('node-telegram-bot-api');
const got = require('got');
// replace the value below with the Telegram token you receive from @BotFather
const botToken = '452863682:AAFvRxV2tJZ9S_rhZ3F2oxn-e3RShwHXZhU';
const newsToken = 'bb18fc4ffcf046589b0b8a743d72a314';
const newsUrl = 'https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=';
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(botToken, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
console.log(msg,match)
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/news/, (msg, match) => {
    got('https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=bb18fc4ffcf046589b0b8a743d72a314').then(function(result, error) {
    match = JSON.parse(result.body); // "Stuff worked!"
    const chatId = msg.chat.id;
    console.log(match.articles[0])
        // send a message to the chat acknowledging receipt of their message
        //   bot.sendMessage(chatId, match.body['articles'][0]);
    }, function(err) {
        console.log(err); // Error: "It broke"
    });
});
  
// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Todays news');
});