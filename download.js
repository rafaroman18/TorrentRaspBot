var shell = require('shelljs')
const torrent = require('./torrent')
const https = require('https')
const fs = require('fs');
const request = require('request')


const download = (ctx) => {
    if (ctx.command.args.length != 1) {
        ctx.reply('ERROR in arguments. Please introduce 1 and only 1 link')
    }
    else {
        ctx.reply('Downloading...')
        
        var download = function(uri, filename, callback){
            request.head(uri, function(err, res, body){
                
                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
        };

        download(ctx.command.args[0], 'SUPER_SECRET_FILE.jpeg', function(){
            ctx.reply('Downloaded!')
        });

        /*
        shell.exec('sudo bash script_Download.sh ' + ctx.command.args[0],{ async: true },(code,stdout,stderr)=>{
            ctx.reply('Downloaded.')
            if (shell.exec('file -b ~/Super_Secret_File') == 'BitTorrent file') {
                ctx.reply('Detected BitTorrent File. Starting Transmission.')
                torrent
            }
            else{
                ctx.reply('Uploading the file to Google Drive...')
                shell.exec('mv ~/Super_Secret_File /mnt/gdrive/TRBDownloads')
            }
        })*/
    }
}

module.exports = download