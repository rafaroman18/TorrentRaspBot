var Webtorrent = require('webtorrent');

async function update(ctx) {
     
     try {
          ctx.reply("Update of all Torrents")
     }
     catch (error) {
          console.log(error)
          ctx.reply('An error ocurred during taking the update.')
     }
}

module.exports = update