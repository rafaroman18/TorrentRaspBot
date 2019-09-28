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

        download(ctx.command.args[0], 'SUPER_SECRET_FILE', function(){
            ctx.reply('Downloaded!')
        });
        
        https.get(ctx.command.args[0],res =>{
            console.log(res.statusCode);
            console.log(res.headers);
        })

    }
}

module.exports = download