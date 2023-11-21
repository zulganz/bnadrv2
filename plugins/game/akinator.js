/*import db from '../../lib/database.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
	let aki = m.isGroup ? db.data.chats[m.chat].akinator : db.data.users[m.sender].akinator
	if (text == 'end') {
		if (!aki.sesi) return m.reply('Tidak sedang dalam sesi Akinator')
		aki.sesi = false
		aki.soal = null
		m.reply('Berhasil keluar dari sesi Akinator.')
	} else {
		if (aki.sesi) return conn.reply(m.chat, `Masih berada dalam sesi Akinator\n*${usedPrefix + command} end* untuk keluar dari sesi Akinator`, aki.soal)
		try {
			let anu = await (await fetch(`https://api.lolhuman.xyz/api/akinator/start?apikey=${api.lol}`)).json()
			if (anu.status != 200) throw Error(anu.message)
			let { server, frontaddr, session, signature, question, progression, step } = anu.result
			aki.sesi = true
			aki.server = server
			aki.frontaddr = frontaddr
			aki.session = session
			aki.signature = signature
			aki.question = question
			aki.progression = progression
			aki.step = step
			let txt = `🎮 *Akinator* 🎮\n\n@${m.sender.split('@')[0]}\n    ${question}\n\n`
			txt += '0 - Ya\n'
			txt += '1 - Tidak\n'
			txt += '2 - Saya Tidak Tau\n'
			txt += '3 - Mungkin\n'
			txt += '4 - Mungkin Tidak\n\n'
			txt += `*${usedPrefix + command} end* untuk keluar dari sesi Akinator`
			let soal = await conn.reply(m.chat, txt, m, { mentions: [m.sender] })
			aki.soal = soal
		} catch (e) {
			console.log(e)
			throw 'server down'
		}
	}
}
*/

import {
    Aki
} from 'aki-api';

let handler = async (m, {
    conn,
    usedPrefix,
    command,
    text
}) => {
    conn.akinator = conn.akinator || {};
    if (text == 'end') {
        if (!conn.akinator[m.sender]) return m.reply('Anda tidak sedang dalam sesi Akinator')
        delete conn.akinator[m.sender]
        m.reply('Berhasil keluar dari sesi Akinator.')
    } else if (text == 'start') {
        if (conn.akinator[m.sender]) return conn.reply(m.chat, 'Anda masih berada dalam sesi Akinator', conn.akinator[m.sender].msg)
        try {
            conn.akinator[m.sender] = new Aki({
                region: 'id',
                childMode: false,
                proxy: undefined
            });
            await conn.akinator[m.sender].start();

            let txt = `🎮 *Akinator* 🎮\n\n@${m.sender.split('@')[0]}\n${conn.akinator[m.sender].question}\n\n`
            txt += '0 - Ya\n'
            txt += '1 - Tidak\n'
            txt += '2 - Saya Tidak Tau\n'
            txt += '3 - Mungkin\n'
            txt += '4 - Mungkin Tidak\n\n'
            txt += `*${usedPrefix + command} end* untuk keluar dari sesi Akinator`
            let soal = await conn.sendMessage(m.chat, {
                text: txt,
                mentions: [m.sender]
            }, {
                quoted: m
            })
            conn.akinator[m.sender].msg = soal
        } catch (e) {
            console.log(e)
            await m.reply(eror)
        }
    } else {
        m.reply(`Contoh: ${usedPrefix + command} start/end`)
    }
}

handler.menufun = ['akinator']
handler.tagsfun = ['game']
handler.tags = ['game']
handler.help = ['akinator']
handler.command = /^(akinator)$/i

handler.limit = true
handler.game = true

export default handler