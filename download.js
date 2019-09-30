var shell = require('shelljs')
const torrent = require('./torrent')
const Fs = require('fs');
const Axios = require('axios');
const Path = require('path');


async function DWNLD(){

    const path = Path.resolve(__dirname,'/home/pi/TRB','test.jpg')
    const url = 'https://unsplash.com/photos/sK81mV5czwM/download?force=true'

    const response = Axios({
        method: 'GET',
        url: url,
        responseType:'stream'
    })

    response.data.pipe(Fs.createWriteStream(path))

    return new Promise((resolve,reject) => {

        response.data.on('end',()=>{
            resolve()
        })

        response.data.on('error',err  =>{
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
        await DWNLD()
        ctx.reply('Downloaded!')
    }
}

module.exports = download