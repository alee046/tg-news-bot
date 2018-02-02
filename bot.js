const TelegramBot = require( 'node-telegram-bot-api' );
const got = require( 'got' );
const FeedMe = require( 'feedme' );
const parser = require( 'parse-rss' );
const _ = require( 'lodash' );
// const tokens = require('config.js)'
const tokens = require('./config.js');

const newsUrl = 'https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=';
console.log(tokens)
const bot = new TelegramBot( tokens.botToken, { polling: true } );

bot.onText( /\/echo (.+)/, ( msg, match ) => {
    const chatId = msg.chat.id;
    const resp = match[ 1 ];
    bot.sendMessage( chatId, resp );
});

bot.onText( /\/news/, ( msg, match ) => {
    const matc = match[ 1 ];
    const chatId = msg.chat.id;

    bot.sendMessage( chatId, '-----Todays news----:' );
    got( 'https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey' + tokens.newsToken ).then( (result, error) => {
        var match = JSON.parse( result.body ); 

        for ( var i in match.articles ) {
            bot.sendMessage( chatId, 
                `${match.articles[i].title} : ${match.articles[i].url}`, 
                { disable_web_page_preview : true }
            );
        }

    }, ( err ) => {
        console.log( err );
    });
});

bot.onText( /\/rss/, ( msg, match ) => {
    const chatId = msg.chat.id;
    parser( "http://feed.informer.com/digests/I2GGLAVR70/feeder.rss", ( err, rss ) => {
    let match =  rss;  
    // match.forEach((r)=>{
    //     console.log(r)
    //     bot.sendMessage( chatId, 
    //         `${r.title} : ${r.link}`, 
    //         { disable_web_page_preview : true }
    //     );
    // });
        for ( var i = 0; i < 5; i++ ) {
            // Runs 5 times, with values of step 0 through 4.
        //     console.log(r)
            bot.sendMessage( chatId, 
                `${match[i].title} : ${match[i].link}`, 
                { disable_web_page_preview : true }
            );
        }
    }) 
})
bot.onText( /\/spamdeezy/, ( msg,match ) => {
    const chatId = msg.chat.id;
    parser( "http://feed.informer.com/digests/I2GGLAVR70/feeder.rss", ( err,rss ) => {
    let match =  rss;  
    // match.forEach((r)=>{
    //     console.log(r)
    //     bot.sendMessage( chatId, 
    //         `${r.title} : ${r.link}`, 
    //         { disable_web_page_preview : true }
    //     );
    // });
        for ( var i = 0; i < 50; i++ ) {
            bot.sendMessage( chatId,
                `
░░░░░░░█▐▓▓░████▄▄▄█▀▄▓▓▓▌█
░░░░░▄█▌▀▄▓▓▄▄▄▄▀▀▀▄▓▓▓▓▓▌█
░░░▄█▀▀▄▓█▓▓▓▓▓▓▓▓▓▓▓▓▀░▓▌█
░░█▀▄▓▓▓███▓▓▓███▓▓▓▄░░▄▓▐█▌ 
░█▌▓▓▓▀▀▓▓▓▓███▓▓▓▓▓▓▓▄▀▓▓▐█
▐█▐██▐░▄▓▓▓▓▓▀▄░▀▓▓▓▓▓▓▓▓▓▌█▌
█▌███▓▓▓▓▓▓▓▓▐░░▄▓▓███▓▓▓▄▀▐█ 
█▐█▓▀░░▀▓▓▓▓▓▓▓▓▓██████▓▓▓▓▐█ 
▌▓▄▌▀░▀░▐▀█▄▓▓██████████▓▓▓▌█▌
▌▓▓▓▄▄▀▀▓▓▓▀▓▓▓▓▓▓▓▓█▓█▓█▓▓▌█▌
█▐▓▓▓▓▓▓▄▄▄▓▓▓▓▓▓█▓█▓█▓█▓▓▓▐
                `, 
                { disable_web_page_preview : true });
        }
    })
})

bot.on( 'message', ( msg ) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  
});