import fs from 'fs'
import db from '../../lib/database.js'
let handler = (m) => m
handler.all = async function (m) {
    const setting = db.data.datas
        if (new Date() * 1 - setting.backup > 1000 * 60 * 60) {
            let d = new Date()
            let date = d.toLocaleDateString('id', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            })
            await db.write()
            this.reply(global.rowner[0] + '@s.whatsapp.net', `Database: ${date}`, null)
            let data = fs.readFileSync('./database.json')
            await this.sendMessage(owner[0] + '@s.whatsapp.net', {
                document: data,
                mimetype: 'application/json',
                fileName: 'database.json',
            }, {
                quoted: null
            })
            setting.backup = new Date() * 1
        }
    return !0
}
export default handler