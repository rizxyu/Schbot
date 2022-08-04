import { areJidsSameUser } from '@adiwajshing/baileys'
import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, text, participants, groupMetadata}) => {
	if(isNaN(text)) {
  	var number = text.split`@`[1]
  } else if(!isNaN(text)) {
  	var number = text
  }

  if(!text && !m.quoted) return conn.reply(m.chat, `Masukan nomor, tag target atau balas pesan target`, m)
  
  if(isNaN(number)) return conn.reply(m.chat, `_*Nomor tidak valid.*_`, m)
  if(number.length > 15) return conn.reply(m.chat, `*_Format Tidak Valid.*_`, m)
  try {
		if(text) {
			var user = number + '@s.whatsapp.net'
		} else if(m.quoted.sender) {
			var user = m.quoted.sender
		} else if(m.mentionedJid) {
  		  var user = number + '@s.whatsapp.net'
			}  
		} catch (e) {
  } finally {
    let users = m.isGroup ? participants.find(v => areJidsSameUser(v.jid == user)) : {}
    if(!users) return conn.reply(m.chat, `*_Target atau Nomor tidak ditemukan, mungkin sudah keluar atau bukan anggota grup ini.*_`, m)
    if(user === m.sender) return conn.reply(m.chat, `_*Tidak bisa berpacaran dengan diri sendiri.*_`, m)
    if(user === conn.user.jid) return conn.reply(m.chat, `_*Tidak bisa berpacaran dengan saya. :')*_`, m)

    if (typeof db.data.users[user] == "undefined") return m.reply("_*Orang yang anda tag tidak terdaftar di dalam database.*_")
    var pacar = db.data.users[user].pasangan
    var spac = db.data.users[m.sender].pasangan
    if(db.data.users[m.sender].pasangan != "" && db.data.users[db.data.users[m.sender].pasangan].pasangan == m.sender && db.data.users[m.sender].pasangan != user){
      conn.reply(m.chat, `Kamu sudah berpacaran dengan @${db.data.users[m.sender].pasangan.split('@')[0]}\n\nSilahkan putus dulu (ketik .putus untuk memutuskan hubungan) untuk menembak @${user.split('@')[0]}\n\nBtw yang setia dikit banget!`, m , { contextInfo: { mentionedJid: [user, db.data.users[m.sender].pasangan]}})
    }else if(db.data.users[user].pasangan != ""){
      if (pacar){
        if (m.sender == pacar && db.data.users[m.sender].pasangan == user) return conn.reply(m.chat, `Anda sudah berpacaran dengan ${spac.split('@')[0]}`, m , { contextInfo: { mentionedJid: [spac]}})
        conn.reply(m.chat, `Maaf, @${user.split('@')[0]} sudah berpacaran dengan @${pacar.split('@')[0]}\nSilahkan cari pasangan lain!`, m , { contextInfo: { mentionedJid: [user, pacar]}})
      }else{
        db.data.users[m.sender].pasangan = user
        conn.reply(m.chat, `Anda baru saja mengajak @${user.split('@')[0]} berpacaran\n\nSilahkan menunggu jawaban darinya!\n\nKetik *${usedPrefix}terima @user* untuk menerima\n*${usedPrefix}tolak @user untuk menolak*`, m , { contextInfo: { mentionedJid: [user]}})
      }
    }else if (db.data.users[user].pasangan == m.sender){
      db.data.users[m.sender].pasangan = user
      var cpt = `Selamat anda resmi berpacaran dengan @${user.split('@')[0]}\n\nSemoga langgeng dan bahagia selalu 🥳🥳🥳`
      conn.reply(m.chat, cpt, m,{ mentions: conn.parseMention(cpt)})
    }else {
      db.data.users[m.sender].pasangan = user
   var cpt = `Kamu baru saja mengajak @${user.split('@')[0]} berpacaran\n\nSilahkan menunggu jawaban darinya!\n\nKetik *${usedPrefix}terima @user* untuk menerima\n*${usedPrefix}tolak @user untuk menolak*`
    conn.reply(m.chat, cpt, m,{ mentions: conn.parseMention(cpt)})
}
	}	
}
handler.help = ['tembak *@tag*', 'jadian *@tag*']
handler.tags = ['jadian']
handler.command = /^(tembak|jadian)$/i
handler.group = true
//ngab
export default handler
