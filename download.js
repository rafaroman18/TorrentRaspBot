var shell = require('shelljs')
const torrent = require('./torrent')
const Fs = require('fs');
const Axios = require('axios');
const Path = require('path');


async function DWNLD(url){

    const path = Path.resolve(__dirname,'/home/pi/TRB','test.jpg')

    const response = Axios({
        method: 'GET',
        url: url,
        responseType:'stream'
    })

    response.data.pipe(Fs.createWriteStream(path))

    return new Promise((resolve,reject) => {

        resolve.data.on('end',()=>{
            resolve()
        })

        resolve.data.on('error',err  =>{
            reject(err)
        })


    })

}



const download = (ctx) => {
    if (ctx.command.args.length != 1) {
        ctx.reply('ERROR in arguments. Please introduce 1 and only 1 link')
    }
    else {
        ctx.reply('Downloading...')
        ctx.reply(ctx.command.args[0])
        DWNLD(ctx.command.args[0])
        ctx.reply('Downloaded!')
    }
}

module.exports = download