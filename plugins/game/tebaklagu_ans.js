import similarity from 'similarity'
import db from '../../lib/database.js'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    let user = db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hlag/i.test(m.quoted.text) || /.*hlag/i.test(m.text))
        return !0
    this.tebaklagu = this.tebaklagu ? this.tebaklagu : {}
    if (!(id in this.tebaklagu))
        return this.reply(m.chat, 'Soal itu telah berakhir', m)
    if (m.quoted.id == this.tebaklagu[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebaklagu[id][3])
            delete this.tebaklagu[id]
            return this.reply(m.chat, '*Yah Menyerah :( !*', m)
        }
        let json = JSON.parse(JSON.stringify(this.tebaklagu[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.judul.toLowerCase().trim()) {
            user.exp += this.tebaklagu[id][2]
            this.reply(m.chat, `✅ *Benar!*\n+${this.tebaklagu[id][2]} XP`, m)
            clearTimeout(this.tebaklagu[id][3])
            delete this.tebaklagu[id]
        } else if (similarity(m.text.toLowerCase(), json.judul.toLowerCase().trim()) >= threshold)
            m.reply(`❗ *Dikit Lagi!*`)
        else
            this.reply(m.chat, `❌ *Salah!*`, m)
    }
    return !0
}
export const exp = 0

const buttontebaklagu = [
    ['tebaklagu', '/tebaklagu']
]