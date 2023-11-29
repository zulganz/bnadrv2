import { Instagram } from "../../lib/instagram.js"

let handler = async (m, { conn, args, usedPrefix, command }) => {
    try {
    if (!args[0]) throw `*Perintah ini untuk mengunduh video dari instagram dengan link*\n\ncontoh:\n${usedPrefix + command} https://www.instagram.com/p/CFqX7ZpJfV0/?utm_medium=copy_link`
    if (!args[0].match(/instagram\.com\/(?:reel|p|tv|([A-Za-z0-9-_.]+\/(reel|p|tv)))\/[A-Za-z0-9-_.]+/g)) throw `*Link salah! Perintah ini untuk mengunduh video dari instagram dengan link*\n\ncontoh:\n${usedPrefix + command} https://www.instagram.com/p/CFqX7ZpJfV0/?utm_medium=copy_link`
    Instagram.download(args[0]).then(async res => {
        conn.sendFile(m.chat, res, 'ig' + args[0].substr(args[0].lastIndexOf('.')), null, m)
    })
} catch (e) {
    console.log (e)
}
    }
handler.help = ['ig <url>']
handler.tags = ['downloader']
handler.command = /^(ig|instagram)$/i
handler.limit = true
handler.register = true
export default handler