import process from 'child_process'
let handler = async (m, { conn, isROwner, text }) => {
    //if (!process.send) throw 'Dont: node main.js\nDo: node index.js'
    if (!isROwner) throw '_eeeeeiiittsssss..._'
    await m.reply('```R E S T A R T . . .```')
    process.send('reset')
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = /^(res(tart)?)$/i

handler.rowner = true

export default handler