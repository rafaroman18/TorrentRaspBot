const drive = require('./drive')
var WebTorrent = require('webtorrent')


async function torrent(ctx, url) {
    try {
        var client = new WebTorrent()

        client.add(url, { path: './tempDownload' }, function (torrent) {
        for(const TOR in client.torrents)
        {
            ctx.reply(TOR.size + '\n')
        }
            return new Promise((resolve, reject) => {
                torrent.on('done', function () {
                    console.log('Torrent ' + torrent.name + ' finished.')
                    ctx.reply('Torrent ' + torrent.name + ' finished.')
                    drive(ctx, torrent.name)
                    
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