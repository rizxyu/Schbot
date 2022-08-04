import fetch from 'node-fetch'
import axios from 'axios'
import cheerio from 'cheerio'

let handler = async (m, { conn, args, usedPrefix, command }) => {

if (!args[0] || !args[1]) return m.reply(`Penggunaan Command Salah\nContoh: *${usedPrefix + command}* Sukabumi Pekalongan \n • Gesek pesan ini`)

let res = await jarak(args[0], args[1])
let { img, desc} = res
console.log(res)
  m.reply('Get Data....')
  conn.sendFile(m.chat, img, "g.jpg", `${desc}`, m)

}

handler.help = ['jarak'].map(v => v + ' <dari> <ke>')
handler.tags = ["internet"]
handler.command = /^jarak$/i
export default handler

//Function jarak
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