const shell = require('shelljs')
const Path = require('path')

async function drive(ctx,name){

    await ctx.reply('Uploading the file to Google Drive!')
    const { stdout, stderr, code } = await shell.exec('file -b "' + Path.resolve(__dirname, 'tempDownload', name) + '"', { silent: true }, { async: true })
    return new Promise((resolve,reject)=>{
        if(stderr){
            ctx.reply('An error has ocurred uploading the file to Google Drive.')
            reject()
        }else{
            ctx.reply('Uploaded to Google Drive successfuly.')
            ctx.reply('File save as '+name)
            resolve()
        }
    })

}


module.exports = drive