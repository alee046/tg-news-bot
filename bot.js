const TelegramBot = require( 'node-telegram-bot-api' );
const got = require( 'got' );
const FeedMe = require( 'feedme' );
const parser = require( 'parse-rss' );
const _ = require( 'lodash' );


const bot = new TelegramBot( botToken, { polling: true } );
const botToken = '452863682:AAFvRxV2tJZ9S_rhZ3F2oxn-e3RShwHXZhU';
const newsToken = 'bb18fc4ffcf046589b0b8a743d72a314';
const newsUrl = 'https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=';

bot.onText( /\/echo (.+)/, ( msg, match ) => {
  const chatId = msg.chat.id;
  const resp = match[ 1 ];
  bot.sendMessage( chatId, resp );
});

bot.onText( /\/news/, ( msg, match ) => {
    // got('http://feed.informer.com/digests/I2GGLAVR70/feeder.rss').then((res, err)=>{
    //     var parser = new FeedMe();
    //     parser.on('channel', (title) => {
    //     console.log('title of feed is', title);
    //     });
    //     parser.on('item', (item) => {
    //     console.log();
    //     console.log('news:', item.title);
    //     console.log(item.description);
    //     });
    //     res.pipe(parser);
    // },
    // function(err) {
        //         console.log(err);
        //     });)\
    const matc = match[ 1 ];
    const chatId = msg.chat.id;

    bot.sendMessage( chatId, '-----Todays news----:' );
    got( 'https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=bb18fc4ffcf046589b0b8a743d72a314' ).then( (result, error) => {
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
bot.onText( /\/yodog/, ( msg, match ) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 
        `/doge
        `
    );
});

bot.on( 'message', ( msg ) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  
});