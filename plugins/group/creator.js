import fetch from 'node-fetch'
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => thumbnailUrl.getRandom())
let name = await conn.getName(who)

  const sentMsg = await conn.sendContact(m.chat, [
    [global.rowner[0], `${await conn.getName(global.rowner[0] + '@s.whatsapp.net')}`, `💌 Developer Bot `, `Not Famous`, `zul@gmail.com`, `🇯🇵 japan`, `📍 https://github.com/zulganz`, `👤 Owner Bandar Bot`],
    [`${conn.user.jid.split('@')[0]}`, `${await conn.getName(conn.user.jid)}`, `🎈 Whatsapp Bot`, `📵 Dont Spam`, `Nothing`, `🇯🇵 japan`, `📍 https://github.com/zulganz`, `Just a normal bot that sometimes has an error ☺`]
  ], fkontak)
  await conn.reply(m.chat,`Hello @${m.sender.split(`@`)[0]} Thats my owner, dont spam or i will block u`, sentMsg, {
                mentions: [m.sender]
            })
}

handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

export default handler