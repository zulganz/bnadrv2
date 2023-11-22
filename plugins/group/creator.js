import fetch from "node-fetch"
import PhoneNumber from 'awesome-phonenumber'
let handler = async (m, {
    conn,
    usedPrefix,
    text,
    args,
    command
}) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
    let name = await conn.getName(who)
    if (command == "owner") {
        try {
            const ownerPromises = global.rowner.map(async (item, index) => [
                item[0],
                (await conn.getName(item[0] + "@s.whatsapp.net")) || "Tidak diketahui",
                "👑 Owner",
                ((await conn.fetchStatus(item[0] + "@s.whatsapp.net")).status) || "Tidak diketahui",
                "zul@gmail.com",
                "🇮🇩 Indonesia",
                "🚀 https://github.com/zulganz",
                "👤 Gada pawang nih senggol dong 😔"
            ]);

            const data = await Promise.all(ownerPromises);

            let contacts = []
            for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) {
                number = number.replace(/[^0-9]/g, '')
                let njid = number + '@s.whatsapp.net'
                let biz = await conn.getBusinessProfile(njid).catch(_ => null) || {}
                // N:;${name.replace(/\n/g, '\\n').split(' ').reverse().join(';')};;;
                let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
item2.EMAIL;type=INTERNET:${isi2}
item2.X-ABLabel:📧 Email
item3.ADR:;;${isi3};;;;
item3.X-ABADR:ac
item3.X-ABLabel:📍 Region
item4.URL:${isi4}
item4.X-ABLabel:Website
item5.X-ABLabel:${isi5}
END:VCARD`.trim()
                contacts.push({
                    vcard,
                    displayName: name
                })
            }
            let tag_own = await conn.sendMessage(m.chat, {
                contacts: {
                    displayName: (contacts.length > 1 ? `2013 kontak` : contacts[0].displayName) || null,
                    contacts,
                },
                contextInfo: {
                    externalAdReply: {
                        title: wm,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: logo,
                        sourceUrl: ''
                    }
                }
            }, {
                quoted: fakes
            })
            await conn.reply(m.chat, `Halo kak @${m.sender.split("@")[0]} itu nomor team developerku, jangan di apa-apain ya kak😖`, tag_own, {
                mentions: [m.sender]
            });
        } catch {
            let tag_own = await conn.sendContact(m.chat, nomorown, await conn.getName(nomorown + "@s.whatsapp.net"), m);
            await conn.reply(m.chat, `Halo kak @${m.sender.split("@")[0]} itu nomor team developerku, jangan di apa-apain ya kak😖`, tag_own, {
                mentions: [m.sender]
            });
        }

    }
}
handler.help = ["owner", "creator", "pengembang"]
handler.tags = ["info"]
handler.command = /^(owner|pengembang|creator)$/i

export default handler