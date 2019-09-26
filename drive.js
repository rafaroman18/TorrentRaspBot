var shell = require('shelljs')

const drive = (ctx) => {
    ctx.reply('Uploading the file to Google Drive...')
    shell.exec('sudo bash script_Drive.sh')
}

module.exports = drive