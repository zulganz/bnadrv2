import fs from 'fs'
import { createSticker } from 'wa-sticker-formatter'
var handler = async (m, {
 conn, 
 args, 
 text, 
 usedPrefix, 
 command
 }) => {
    text = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.quoted && m.quoted.caption ? m.quoted.caption : m.quoted && m.quoted.description ? m.quoted.description : ''
    if (!text) throw `Example : ${usedPrefix + command} Lagi Ruwet`
    const res = `https://aemt.me/attp?text=${encodeURIComponent(text.substring(0, 151))}`
    var error = fs.readFileSync(`./media/sticker/emror.webp`)
    try {
        if (command == 'attp' || command == 'attp') {
            var stiker = await createSticker(res, { packname })
            await conn.sendFile(m.chat, stiker, 'emror.webp', '', m)
        }
    } catch (e) {
        console.log(e)
        await conn.sendFile(m.chat, error, 'error.webp', '', m)
    }
}

handler.command = handler.help = ['attp']
handler.tags = ['creator']
handler.limit = true

export default handler