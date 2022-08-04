import axios from "axios"
import cheerio from "cheerio"
import FormData from "form-data"

let handler = async (m, { conn, args, usedPrefix, command }) => {

if (!args[0]) return m.reply(`Link tiktoknya mana`)
if (!args[1]) throw 'name audio?'
let res = await axios("https://musicaldown.com/id")
let token = []
let $ = cheerio.load(res.data)
$("form > div > div > input").each(function() {
  let value = $(this).val()
  let name = $(this).attr("name")
  if (!value) value = args[0]
  token.push(name, value)
})
let form = new FormData
form.append(token[0], token[1])
form.append(token[2], token[3])
form.append(token[4], token[5])
let resu = await axios({
  url: "https://musicaldown.com/id/download",
  method: "post",
  data: form,
  headers: {
    ...form.getHeaders(),
    cookie: res.headers["set-cookie"]
  }
})
let resul = await axios({
  url: "https://musicaldown.com/id/mp3",
  method: "post",
  headers: {
    cookie: res.headers["set-cookie"]
  }
})
let $$ = cheerio.load(resu.data)
let $$$ = cheerio.load(resul.data)
let result = {
  video: $$("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)").attr("href"),
  audio: $$$("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(5)").attr("href"),
  video_original: $$("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)").attr("href"),
  audio_original: $$$("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(9)").attr("href"),
  preview: $$("body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4 > img").attr("src")
}
let hasil = result.audio || result.audio_original

m.reply(wait + ", jika ingin mendownload video Ketik .tiktok url untuk")
conn.sendFile(m.chat, hasil, args[1] + ".mp3" ? args[1] + ".mp3" : "Notitle.mp3", null, m, null, {asDocument: true})

}
handler.help = ['tiktokmusik', 'ttm', 'ttmusik'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(t(iktokmusik)?(tm)?(tmusik)?(tmusic)?)$/i

export default handler
