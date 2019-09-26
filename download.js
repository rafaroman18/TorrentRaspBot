var shell = require('shelljs')
const torrent = require('./torrent')

const download = (ctx) => {
    ctx.reply('Downloading...')
    if (ctx.command.args.length != 1) {
        ctx.reply('ERROR in arguments. Please introduce 1 and only 1 link')
    }
    else {
        shell.exec('sudo bash script_Download.sh ' + ctx.command.args[0])
        while(shell.exec('ps -ef | grep wget | grep -v grep')!=''){}
        ctx.reply('Downloaded.')
        if (shell.exec('file -b ~/Super_Secret_File') == 'BitTorrent file') {
            ctx.reply('Detected BitTorrent File. Starting Transmission.')
            torrent
        }
        else{
            ctx.reply('Uploading the file to Google Drive...')
            shell.exec('mv ~/Super_Secret_File /mnt/gdrive/TRBDownloads')
        }       
    }
}

module.exports = download