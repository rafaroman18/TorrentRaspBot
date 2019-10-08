var shell = require('shelljs')

async function torrent(ctx) {
    ctx.reply('Starting Download...')
    shell.exec('sudo bash script_Torrent.sh',{async:true},(code,stdout,stderr) =>{
        if (code == "0") {
            ctx.reply('Downloaded.')
        }
        ctx.reply('Uploading the file to Google Drive...')
        shell.exec('sudo bash script_Drive.sh')
    })
}

module.exports = torrent