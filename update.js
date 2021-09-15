

async function update(ctx) {
     try {
               global.client.torrents.every((currentTorrent)=> {
                    ctx.reply('Torrent ' + currentTorrent.name + '\n Progress: ' + Math.trunc(currentTorrent.progress*100)  + '%\n Time Remaining: ' + currentTorrent.timeRemaining + '\n Download Speed: ' + currentTorrent.downloadSpeed + '\n Upload Speed: ' + currentTorrent.uploadSpeed);
		    console.log('Torrent ' + currentTorrent.name + '\n Progress: ' + Math.trunc(currentTorrent.progress*100)  + '%\n Time Remaining: ' + currentTorrent.timeRemaining + '\n Download Speed: ' + currentTorrent.downloadSpeed + '\n Upload Speed: ' + currentTorrent.uploadSpeed);
		    ctx.reply('----------------------------\n')           
	});
     }
     catch (error) {
          console.log(error)
          ctx.reply('An error ocurred during taking the update.')
     }
}

module.exports = update
