import db from '../lib/database.js'
import axios from 'axios'
import cheerio from 'cheerio'

let handler = m => m
handler.before = async function (m) {
    if (!/^-?[0-9]+(\.[0-9]+)?$/.test(m.text)) return !0
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.text || !/^Penggunaan Command Salah/i.test(m.quoted.text)) return !0
    
    if (m.quoted.id) {
      if (m.text) {
      let res = await jarak(m.text)
let { img, desc} = res
console.log(res)
  m.reply('Get Data....')
  conn.sendFile(m.chat, img, "g.jpg", `${desc}`, m)
      } else {
let res = await jarak(m.text)
let { img, desc} = res
console.log(res)
  m.reply('Get Data....')
  conn.sendFile(m.chat, img, "g.jpg", `${desc}`, m)
      }
    }
    return !0
}

export default handler

async function jarak(dari, ke) {
  let url = `https://www.google.com/search?q=${encodeURIComponent("jarak " + dari + " ke " + ke)}&hl=id`
  let { data } = await axios(url)
  let $ = cheerio.load(data)
  let img = data.split("var s=\'")[1].split("\'")[0]
  let res = {
    img: /^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split`,`[1], 'base64') : '',
    desc: $("div.BNeawe.deIvCb.AP7Wnd").text()
  }
  return res
}