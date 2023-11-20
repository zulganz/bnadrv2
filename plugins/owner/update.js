import { execSync } from ('child_process')
let handler = async (m, { conn, text }) => {
  if (global.conn.user.jid == conn.user.jid) {
    let stdout = execSync('git pull https://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:x-oauth-basic@github.com/zulganz/bnadrv2.git')
    require('fs').readdirSync('plugins').map(v=>global.reload('', v))
    conn.reply(m.chat, stdout.toString(), m)
  }
}
handler.help = ['update']
handler.tags = ['host']
handler.command = /^update$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

export default handler