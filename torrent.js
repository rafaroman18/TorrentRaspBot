const drive = require('./drive')
const update = require('./update')

async function torrent(ctx, url) {
    try {
        global.client.add(url, { path: './tempDownload' }, function (torrent) {
	    
            return new Promise((resolve, reject) => {

                torrent.on('done', function () {

		    //We tell the user that the torrent is finished
		    console.log('Torrent ' + torrent.name + ' finished.')
                    ctx.reply('Torrent ' + torrent.name + ' finished.')

		    //Then we upload it to Drive
                    drive(ctx, torrent.name)

		    //Once the torrent has been downloaded, we remove it from the array of torrents
		    global.client.torrents.splice(global.client.torrents.indexOf(torrent),1)

                    resolve
                })
                torrent.on('error', reject)
            })
        })

    } catch (error) {
        console.log(error)
        await ctx.reply('An error has ocurred during downloading the Torrent. See if the torrent is still up and it\'s correct.')
    }
}

module.exports = torrent
