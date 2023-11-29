
const timeout = 1800000
import db from '../../lib/database.js'
let handler = async (m, { conn, usedPrefix, text }) => {
	    let time = db.data.users[m.sender].lastmulung + 1800000
  if (new Date - db.data.users[m.sender].lastmulung < 1800000) throw `Anda sudah lelah untuk mulung\nTunggu selama ${msToTime(time - new Date())} lagi`
	let botolnye = `${Math.floor(Math.random() * 1000)}`.trim()
    db.data.users[m.sender].trash += botolnye * 1
	db.data.users[m.sender].lastmulung = new Date * 1
  m.reply(`Selamat kamu mendapatkan : \n+${botolnye} Botol\n+${kardusnye} Kardus\n+${kalengnye} Kaleng`)
  setTimeout(() => {
					conn.reply(m.chat, `Yuk waktunya mulung lagi 😅`, m)
					}, timeout)
}
handler.help = ['mulung']
handler.tags = ['rpg']
handler.command = /^(mulung)/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = true
handler.exp = 0
handler.money = 0

export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    
  
  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " jam " + minutes + " menit " + seconds + " detik"
}