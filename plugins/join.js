import db from "../lib/database.js"

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async(m, { conn, usedPrefix, text, isOwner }) => {
  conn.req = conn.req || {}
  let [_, code, expired] = text.match(linkRegex) || []
  if(!code) return m.reply("Where Link grup?")

  if(isOwner || m.fromMe) {
    let res = await conn.groupAcceptInvite(code)
    expired = Math.floor(Math.min(999, Math.max(1, (expired * 1)))) || 1
    m.reply(`Berhasil join grup ${res} selama ${expired} hari`).then(() => {
      let chats = db.data.chats[res]
      if(!chats) chats = db.data.chats[res] = {}
      if(expired) chats.expired = +new Date() + expired * 1000 * 60 * 60 * 24
    })
    let caption = `${conn.getName(conn.user.jid)} Adalah Bot whatsapp Yang dibangun dengan NodeJs, Grup Telah Diijinkan oleh @${m.sender.split("@")[0]}${expired ? " selama " + expired + " hari" : ""}. Ketik /menu Untuk melihat daftar fitur\n\n*Note:* _Jangan Spam Bot_`
    conn.sendButton(res, caption, author, [["Menu",".menu"]], m, { mentions: conn.parseMention(caption) })
  } else {
    if(conn.req["join-" + code]) return m.reply("Tautan itu masih di proses!")
    conn.req["join-" + code] = {
      "sender": m.sender,
      "msg": m,
      "date": new Date(((m.messageTimestamp + "000")*1)+(1000*60*60*7)),
      "link": "https://chat.whatsapp.com/" + code
    }
    let data = owner.filter(([id, _, isCreator]) => id && isCreator).map(v => v[0])
    for(let jid of data) conn.sendButton(jid + "@s.whatsapp.net" , `Request to join group from *${conn.getName(m.sender)}* (@${m.sender.split("@")[0]})\n\nURL: https://chat.whatsapp.com/${code}`, "join request", null, [["Accept", "accept"], ["Reject", "reject"]], m, { mentions: [m.sender] })
    m.reply("Sedang di Diperiksa Owner")
  }
}

handler.before = async function(m, {conn}) {
  conn.req = conn.req || {}
  if(m?.quoted?.mtype != "buttonsMessage") return
  if(!owner.some(v => v[0] == m.sender.split("@")[0])) return

  let isJoinReq = m?.quoted?.footerText == "join request"
  if(!isJoinReq) return

  let code = m?.quoted?.contentText?.split("/")?.at?.(-1)
  let isAccept = m.message[Object.keys(m.message)[0]].text == "Accept"
  let isReject = m.message[Object.keys(m.message)[0]].text == "Reject"

  if(isAccept) {
    conn.req["join-" + code].msg.reply("grup sudah diizinkan owner")
    delete conn.req["join-" + code]
    await m.quoted.delete()
    let res = await conn.groupAcceptInvite(code)
    let expired = Math.floor(Math.min(999, Math.max(1, (7 * 1)))) || 1
    m.reply(`Berhasil join grup ${res} selama ${expired} hari`).then(() => {
      let chats = db.data.chats[res]
      if(!chats) chats = db.data.chats[res] = {}
      chats.expired = +new Date() + 7 * 1000 * 60 * 60 * 24
    })
    let caption = `${conn.getName(conn.user.jid)} Adalah Bot whatsapp Yang dibangun dengan NodeJs, Grup Telah Diijinkan oleh @${m.sender.split("@")[0]}${expired ? " selama " + expired + " hari" : ""}. Ketik /menu Untuk melihat daftar fitur\n\n*Note:* _Jangan Spam Bot_`
    await conn.sendButton(res, caption, author, null, [["Menu",".menu"]], m, { mentions: conn.parseMention(caption) })
 } else if(isReject) {
    m.reply("Ok")
    conn.req["join-" + code].msg.reply("grup ditolak oleh owner")
    delete conn.req["join-" + code]
    await m.quoted.delete()
 }
}

handler.help = ["join <chat.whatsapp.com>"]
handler.tags = ["main"]
handler.command = /^join$/i
handler.owner = false

export default handler

const isNumber = (x) => (x = parseInt(x), typeof x === "number" && !isNaN(x))