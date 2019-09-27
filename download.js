var shell = require('shelljs')
const torrent = require('./torrent')
const http = require('http')
const fs = require('fs');



const download = (ctx) => {
    if (ctx.command.args.length != 1) {
        ctx.reply('ERROR in arguments. Please introduce 1 and only 1 link')
    }
    else {
        ctx.reply('Downloading...')

        var request = http.get(ctx.command.args[0]).on('response', function(res) { 
            console.log('in cb');           
            var len = parseInt(response.headers['content-length'], 10);
            var downloaded = 0;
            
            res.on('data', function(chunk) {
                file.write(chunk);
                downloaded += chunk.length;
                process.stdout.write("Downloading " + (100.0 * downloaded / len).toFixed(2) + "% " + downloaded + " bytes" + isWin ? "\033[0G": "\r");
                // reset timeout
                clearTimeout( timeoutId );
                timeoutId = setTimeout( fn, timeout );
            }).on('end', function () {
                // clear timeout
                clearTimeout( timeoutId );
                file.end();
                console.log(file_name + ' downloaded to: ' + apiPath);
                callback(null);
            }).on('error', function (err) {
                // clear timeout
                clearTimeout( timeoutId );                
                callback(err.message);
            });           
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