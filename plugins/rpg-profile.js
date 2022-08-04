import { join } from 'path'
import { xpRange, canLevelUp } from '../lib/levelling.js'
import db from '../lib/database.js'
import canvacord from 'canvacord'

let handler = async (m, { conn, usedPrefix, command }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let { exp, limit, level, role, money, lastclaim, lastweekly, registered, regTime, age, banned, pasangan } = db.data.users[who]
    let { min, xp, max } = xpRange(level, multiplier)
    let name = await conn.getName(who)
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => './src/avatar_contact.png')
    //sorted level for rank
    let user = db.data.users[who]
    let args = 'level'
    let users = Object.entries(db.data.users).map(([key, value]) => {
    return { ...value, jid: key }
  })
    let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
    let usersLevel = sortedLevel.map(enumGetKey)
    
    if (typeof db.data.users[who] == "undefined") {
      db.data.users[who] = {
        exp: 0,
        limit: 10,
        lastclaim: 0,
        registered: false,
        name: conn.getName(m.sender),
        age: -1,
        regTime: -1,
        afk: -1,
        afkReason: '',
        banned: false,
        level: 0,
        lastweekly: 0,
        role: 'Warrior V',
        autolevelup: false,
        money: 0,
        pasangan: "",
      }
     }
     let math = max - xp
     
let caption = `*YOUR PROFILE*
*🏷️ Nama:* *(${name})* ${registered ? '(' + name + ') ' : ''} ( @${who.split("@")[0]} )
*❤️ Pasangan:*  ${pasangan ? `@${pasangan.split("@")[0]}` : `Jomblo Ngenes`}
*💲 Money:* *RP* ${money}
*🎟️ Limit:* ${limit}
*🏆 Level* ${level}
*🥇Rank Level:* ${usersLevel.indexOf(m.sender) + 1}
*🎋 Role:* ${role}
*🧬 XP:* TOTAL _${exp} (${exp - min} / ${xp})_ [${math <= 0 ? `Siap untuk *${usedPrefix}levelup*` : `${math} XP lagi untuk levelup`}]
*📨 Terdaftar:* ${registered ? 'Ya (' + new Date(regTime).toLocaleString() + ')' : '❌'} ${lastclaim > 0 ? '\n*⏱️Terakhir Klaim:* ' + new Date(lastclaim).toLocaleString() : ''}\n\n Ketik ${usedPrefix}inv untuk melihat Inventory RPG`
let discriminator = who.substring(9, 13)

   
let rank = new canvacord.Rank()
    .setRank(usersLevel.indexOf(who) + 1)
    .setLevel(level)
    .setAvatar(pp)
    .setCurrentXP(exp - min)
    .setRequiredXP(xp)
    .setStatus("online")
    .setProgressBar("#FFFFFF", "COLOR")
    .setUsername(name)
    .setDiscriminator(discriminator)

rank.build()
    .then(data => {
 conn.sendFile(m.chat, data, 'canva.jpg', caption, m , false, { contextInfo: { mentionedJid: [who, pasangan] } })
   })

}

handler.help = ['profile'].map(v => v + ' <url>')
handler.tags = ['rpg']

handler.command = /^(pro(fil)?(file)?)$/i

export default handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
  return a.jid
}

/**
 * Detect Number
 * @param {Number} x 
 */
function isNumber(number) {
  if (!number) return number
  number = parseInt(number)
  return typeof number == 'number' && !isNaN(number)
}
