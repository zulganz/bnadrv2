let handler = m => m
handler.before = async function (m, { conn, isOwner }) {
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/(REPORT|REQUEST|KONFIR|KONFIRM)!/i.test(m.quoted.text)) return !0
    if (!isOwner) throw false
    conn.reply(m.quoted.mentionedJid[0], '*Pesan dari owner:* ' + m.text, m)
    conn.reply(m.key.remoteJid, '*pesan berhasil terkirim*', m)
}
export default handler