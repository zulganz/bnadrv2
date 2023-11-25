import moment from 'moment-timezone'
import fs from 'fs'
import db from '../../lib/database.js'
let cooldowns = '1000 * 60 * 60 * 3'
export async function all(m) {
    //let time = moment.tz('Asia/Jakarta').format('HH')
    let cooldown = db.data.datas.backup
    if (new Date() > cooldown) return !0
        await this.reply(m.chat, `Backup file`, m)
        await this.sendMessage(global.rowner[0] + '@s.whatsapp.net', { document: fs.readFileSync('./database.json'), fileName: 'database.json', mimetype: 'application/json' }, { quoted: null })
		await this.sendMessage(global.rowner[0] + '@s.whatsapp.net', { document: await fs.readFileSync('./sessions/creds.json'), fileName: 'creds.json', mimetype: 'application/json' }, { quoted: null })
        cooldown += new Date() * cooldowns
}