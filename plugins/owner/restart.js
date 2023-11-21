import { spawn } from 'child_process'
import { fork } from 'cluster'
let handler = async (m, { conn, isROwner, text }) => {
    let p = fork()
    if (!p.send) throw 'Dont: node main.js\nDo: node index.js'
    if (!isROwner) throw '_eeeeeiiittsssss..._'
    await m.reply('```R E S T A R T . . .```')
    p.send('reset')
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = /^(res(tart)?)$/i

handler.rowner = true

export default handler