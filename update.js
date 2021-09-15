

async function update(ctx) {
     try {
               global.client.torrents.every((currentTorrent)=> {
                    ctx.reply('Torrent ' + currentTorrent.name + '. Progress: ' + Math.trunc(currentTorrent.progress*100)  + '%. Time Remaining: ' + currentTorrent.timeRemaining + '. Download Speed: ' + currentTorrent.downloadSpeed + '. Upload Speed: ' + currentTorrent.uploadSpeed);('Torrent ' + currentTorrent.name + '. Time Remaining: ' + currentTorrent.timeRemaining + '. Download Speed: ' + currentTorrent.downloadSpeed + '. Upload Speed: ' + currentTorrent.uploadSpeed);
		    console.log('Torrent ' + currentTorrent.name + '. Progress: ' + Math.trunc(currentTorrent.progress*100)  + '%. Time Remaining: ' + currentTorrent.timeRemaining + '. Download Speed: ' + currentTorrent.downloadSpeed + '. Upload Speed: ' + currentTorrent.uploadSpeed);           
	});
     }
     catch (error) {
          console.log(error)
          ctx.reply('An error ocurred during taking the update.')
     }
}

module.exports = update
