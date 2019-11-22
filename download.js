const drive = require('./drive')
const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')
const shell = require('shelljs')
var WebTorrent = require('webtorrent')


async function download(ctx) {
    try {

        var url = ctx.command.args[0]
        var name = ctx.command.args[1]

        //Here we will request a name for the url that are not magnet links
        /*if (url.substr(0, 7) != 'magnet:'){
            var name
            await ctx.reply('Detected a non-magnet link.'+ '\n' + 'Introduce a name for the file to Download')
            
        }*/

        await ctx.reply('Downloading...')
        var magnet = await DWNLD(url, name, ctx) //We call the function

        //In DWNLD we check if it is a magnet link. If it is, then it downloads (magnet==1)
        //If not, then we will download the file of the url (magnet==0)
        if (magnet == 0) {

            //After that, we will check the file and see if it is a ".torrent"
            var filetype = await GetTheFileType(ctx, name) //We see the type of file

            //filetype == 1 -> Torrent
            //filetype == 0 -> Another Type of File
            if (filetype == 0) {
                if (ctx.command.args.length != 2) {

                    await shell.exec('rm -r ./tempDownload', { silent: true }, { async: true })
                    ctx.reply('ERROR in arguments. Please introduce 2 and only 2 arguments: url and name')
                    throw error

                } else {
                    //Then we uploado the file to Drive
                    await drive(ctx, name)
                }
            }
            else {

                await ctx.reply('Torrrent File Detected. Sending to Webtorrent.')

                //We call the webtorrent function to put the Torrent File to Download
                //After the download, it calls to Drive function
                await torrent(ctx, './tempDownload/' + name)
            }
        }
    } catch (error) {
        console.log(error)
        ctx.reply('An error has ocurred during the download...')
    }
}


// Function to make a GET on any url
async function DWNLD(url, name, ctx) {
    await shell.exec('mkdir -p tempDownload', { silent: true }, { async: true }) //We create the folder 'tempDownload' if it doesnt exits yet
    var magnet = 1
    try {
        if (url.substr(0, 7) == 'magnet:') {
            await ctx.reply('Magnet Link detected. Sending to Webtorrent.')
            await ctx.reply('Starting the Torrent.')

            //Then we call the WebTorrent Function
            await torrent(ctx,url)

            return new Promise((resolve, reject) => { //Promise (async object)
                resolve(magnet)
            })
        }
        else {
            magnet = 0
            const path = Path.resolve(__dirname, './tempDownload', name) //Path  
            const writer = Fs.createWriteStream(path)

            const response = await Axios({
                method: 'GET',
                url: url,
                responseType: 'stream'
            })

            response.data.pipe(writer)

            await ctx.reply('Downloaded!') //If it is successful, reply 'Downloaded!'

            return new Promise((resolve, reject) => { //Promise (async object)
                writer.on('finish', resolve(magnet))
                writer.on('error', reject)
            })
        }
    }
    catch (error) {
        console.log(error)
        await ctx.reply('An error has ocurred during downloading. See if the url it\'s correct.')
    }
}



//This function will return 
async function GetTheFileType(ctx, name) {
    try {
        const { stdout, stderr, code } = await shell.exec('file -b /home/pi/TRB/tempDownload/' + name, { silent: true }, { async: true })
        var prom;

        //prom == 1 -> Torrent File
        //prom == 0 -> Another Type File
        if (stdout == ("BitTorrent file" + '\n')) {
            prom = 1;
        } else {
            prom = 0;
        }

        return new Promise((resolve, reject) => {
            resolve(prom)
        })
    }
    catch (error) {
        console.log(error)
        ctx.reply('An error has ocurred during detecting file type')
    }
}

module.exports = download