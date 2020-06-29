var WebTorrent = require('webtorrent')

var client;

function updateClient(currentClient) {client = currentClient}

async function update(ctx) {
     try {
          var allTorrents = client.torrents;
          
               allTorrents.every((currentTorrent)=> {
                    ctx.reply('Torrent ' + currentTorrent.name + '. Time Remaining: ' + currentTorrent.timeRemaining + '. Download Speed: ' + currentTorrent.downloadSpeed + '. Upload Speed: ' + currentTorrent.uploadSpeed);
               });

          /*return new Promise((resolve, reject) => {
               
           })*/
     }
     catch (error) {
          console.log(error)
          ctx.reply('An error ocurred during taking the update.')
     }
}

module.exports = update