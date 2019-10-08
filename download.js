const torrent = require('./torrent')
const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');
const shell = require('shelljs')


async function DWNLD(url) { // Function to make a GET on any url

    try {
        const path = Path.resolve(__dirname, '/home/pi/TRB/tempDownload', 'file') //Path  //NEEDED INTRODUCE A WAY TO INCREMENT FILE NAME  
        const writer = Fs.createWriteStream(path)

        const response = await Axios({
            method: 'GET',
            url: url,
            responseType: 'stream'
        })

        response.data.pipe(writer)

        return new Promise((resolve, reject) => { //Promise (async object)
            writer.on('finish', resolve)
            writer.on('error', reject)
        })
    } catch (error) {
        console.log(error)
        ctx.reply('An error has ocurred during downloading. See if the url it\'s correct.')
    }
}



async function GetTheFileType(ctx) {
    try {
        const { stdout, stderr, code } = await shell.exec('file -b /home/pi/TRB/tempDownload/file', { silent: true }, { async: true })

        return new Promise((resolve, reject) => { //Promise (async object)

            resolve(stdout)

        })
    }
    catch (error) {
        console.log(error)
        ctx.reply('An error has ocurred during detecting file type')
    }
}

async function SendToTRRNT(stdout, ctx) {
    try {
        var prom;
        if (stdout == ("BitTorrent file" + '\n')) {
            prom = 1;
            ctx.reply("Torrent File detected. Starting Transmission")
            await torrent
        }else{
            prom = 0;
        }

        return new Promise((resolve,reject) => {
            resolve(prom)
        })


    }
    catch (error) {
        console.log(error)
        ctx.reply('An error has ocurred. Try again later...')
    }
}

async function download(ctx) {
    try {
        if (ctx.command.args.length != 1) {
            ctx.reply('ERROR in arguments. Please introduce 1 and only 1 link')
        }
        else {
            ctx.reply('Downloading...')
            await DWNLD(ctx.command.args[0]) //We call the function
            ctx.reply('Downloaded!') //If it is successful, reply 'Downloaded!'
            var filetype = await GetTheFileType(ctx) //We see the type of file
            SendToTRRNT(filetype, ctx)
        }
    } catch (error) {
        console.log(error)
        ctx.reply('An error has ocurred. Try again later...')
    }
}

module.exports = download