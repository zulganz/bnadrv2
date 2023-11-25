import db from '../lib/database.js'
import moment from 'moment-timezone'
let cooldown = '1000 * 60 * 60 * 3'
export async function all() {
    //let time = moment.tz('Asia/Jakarta').format('HH')
    if (!isMods) return !0
    if (+new Date() > cooldown) {
        await this.reply(m.chat, `Backup file`, m)
        await conn.sendMessage(global.rowner[0] + '@s.whatsapp.net', { document: fs.readFileSync('./database.json'), fileName: 'database.json', mimetype: 'application/json' }, { quoted: null })
		await conn.sendMessage(global.rowner[0] + '@s.whatsapp.net', { document: await fs.readFileSync('./sessions/creds.json'), fileName: 'creds.json', mimetype: 'application/json' }, { quoted: null })
        cooldown = +new Date() + 1000 * 60 * 60 * 3
    }
}