import { createHash } from 'crypto'
import db from '../lib/database.js'
let timeout = 60000
let Reg = /(.*)([.|])([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix }) {
var id = m.sender
conn.verify = conn.verify ? conn.verify : {}

let sn = (Math.floor(Math.random() * 4081)) * 1

var jkop = {
result: sn
}

let coy = `${m.sender}`

if ( coy in conn.verify) {
m.reply('Bruh You in Progress Register')
throw false
}
if (db.data.users[m.sender].registered == true) throw "you have registered"
conn.reply(m.chat, `@${coy.split("@")[0]} Code verification has been send`, m, { contextInfo: { mentionedJid: [coy]}})
conn.verify[coy] = [
await conn.reply(coy, `VERIFY ALERT
Reply This message!
Your Code Verification ${sn}

ends in 1 minute
lost code .getcodeid`, m), 
jkop,
     setTimeout(() => {
            if (conn.verify[id]) conn.reply(coy, `Your session end/n If you want to re-register, type the command earlier`, m)
            delete conn.verify[id]
        }, timeout)
      ]
    }
handler.help = ['register']
handler.tags = ['main']
handler.command = /^reg(ister)?$/i
export default handler
