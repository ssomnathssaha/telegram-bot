const Botgram = require("botgram");
const https = require("https");
const request = require("request");
const util = require("util");
const TELEGRAM_BOT_TOKEN = "1443420444:AAGUCJfXlbc5nDVpsCdEOZhOVoBh8lPQhM4";

const { TELEGRAM_BOT_TOKEN } = process.env;

if (!TELEGRAM_BOT_TOKEN) {
  console.error(
    "Seems like you forgot to pass Telegram Bot Token. I can not proceed..."
  );
  process.exit(1);
}

const bot = new Botgram(TELEGRAM_BOT_TOKEN);


bot.ready(function () {
  console.log("I'm user %s (%s).", bot.get("id"), bot.get("firstname"));
});

bot.synced(function () {
  console.log("\nTalk to me: %s", bot.link());
  console.log("Waiting for messages...");
});

function handler(msg, reply, next) {
  var type = msg.type ? msg.type : "unknown message";
  type = msg.edited ? ("Edited " + type) : capitalize(type);
  console.log("\n%s at %s %s (%s):", type, msg.chat.type, msg.chat.id, msg.chat.name);
  console.log(util.inspect(msg, {colors: true, depth: null}));
}

bot.all(handler);
bot.edited.all(handler);

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

/*
function onMessage(msg, reply) {
  
  const options = {
    hostname: 'cdn-api.co-vin.in',
    path: '/api/v2/admin/location/states',
    //method: 'GET',
    headers: {
      "accept":"application/json", 
      "Accept-Language": "hi_IN",
      "User-Agent": "Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
    }
};

https
  .get(options, resp => {
    let data = "";

    // A chunk of data has been received.
    resp.on("data", chunk => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on("end", () => {
      reply.text(data);
      //console.log(JSON.parse(data).explanation);
    });
  })
  .on("error", err => {
    reply.text("Error: " + err.message);
  });
}

bot.text(onMessage);


function onMessage(msg, reply) {
  figlet(msg.text, (err, data) => {
    if (err) {
      reply
        .text("An error occured. Probably text format is not correct.")
        .then();
      return;
    }
    const markdownResult = `${"```\n"}${data}${"\n```"}`;
    reply.markdown(markdownResult).then();
  });
}

bot.text(onMessage);
*/
