const commandArgs = (ctx, next) => {
    if (ctx.updateType === 'message' && ctx.update.message.text !== undefined) {
      const text = ctx.update.message.text
      //if (text.startsWith('/')) {
        const match = text.match(/^\/([^\s]+)\s?(.+)?/)
        let args = [] 
        let command
        if (match !== null) {
          if (match[1]) {
            command = match[1]
          }
          if (match[2]) {
            args = match[2].split(' ')
          }
        }
        ctx.command = {
          raw: text,
          command,
          args,
        }
        console.log(ctx.command)
      //}
    }
    return next()
  }
  
  module.exports = commandArgs