import Webtorrent from 'webtorrent';

async function update(ctx) {
   try{
        var client = Webtorrent()
        var torrents = clients.torrents[...]
   }
   catch(error){
        console.log(error)
        ctx.reply('An error ocurred during taking the update.')
   }
  }

module.exports = update