const shell = require('shelljs')

async function drive(ctx,name){

    await ctx.reply('Uploading the file to Google Drive!')
    const { stdout, stderr, code } = await shell.exec('file -b /home/pi/TRB/tempDownload/'+name, { silent: true }, { async: true })
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