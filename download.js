const torrent = require('./torrent')
const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');
const shell = require('shelljs')



async function DWNLD(url){ // Function to make a GET on any url

    const path = Path.resolve(__dirname,'/home/pi/TRB/tempDownload','file'   INTRODUCE A WAY TO INCREMENT FILE NAME     ) // PATH

    const response = Axios({
        method: 'GET',
        url: url,
        responseType:'stream'
    }).then(function(response){
        response.data.pipe(Fs.createWriteStream(path))

        return new Promise((resolve,reject) => { //Promise (async object)

            response.data.on('end',()=>{
                resolve()
                
            })
        })
    })
}


const download = (ctx) => {
    if (ctx.command.args.length != 1) {
        ctx.reply('ERROR in arguments. Please introduce 1 and only 1 link')
    }
    else {
        ctx.reply('Downloading...')
        DWNLD(ctx.command.args[0]).then(() => { //We call the function
            ctx.reply('Downloaded!')            //If it is successful, reply 'Downloaded!'
            
        /*function fileValidation(){
            var fileInput = document.getElementById('file');
            var filePath = fileInput.value;
            var allowedExtensions = /(\.torrent)$/i;
            if(!allowedExtensions.exec(filePath)){
                alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
                fileInput.value = '';
                return false;
    }}*/

        })
    }
}

module.exports = download