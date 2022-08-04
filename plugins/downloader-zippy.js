import _$ from 'cheerio'
import _url from 'url'
import _axios from 'axios'
import {evaluate} from 'mathjs'
const GetLink = async (u) => {
        console.log('⏳  ' + `Get Page From : ${u}`)
						const zippy = await _axios({ method: 'GET', url: u }).then(res => res.data).catch(err => false)
						console.log('✅  ' + 'Done')
						const $ = _$.load(zippy)
						if (!$('#dlbutton').length) {
							return { error: true, message: $('#lrbox>div').first().text().trim() }
						}
						console.log('⏳  ' + 'Fetch Link Download...')
						const filename0 = $('title').text()
						const filename = filename0.replace('Zippyshare.com - ', '')
						const url = _url.parse($('.flagen').attr('href'), true)
						const urlori = _url.parse(u)
						const key = url.query['key']
						let time;
						let dlurl;
						try {
							time = /var b = ([0-9]+);$/gm.exec($('#dlbutton').next().html())[1]
							dlurl = urlori.protocol + '//' + urlori.hostname + '/d/' + key + '/' + (2 + 2 * 2 + parseInt(time)) + '3/DOWNLOAD'
						} catch (error) {
							time = evaluate(/ \+ \((.*)\) \+ /gm.exec($('#dlbutton').next().html())[1])
							dlurl = urlori.protocol + '//' + urlori.hostname + '/d/' + key + '/' + (time) + '/DOWNLOAD'
						}
						console.log('✅  ' + 'Done')
						return { error: false, url: dlurl, name: filename }
					}

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return m.reply("masukkan link")
if (!text.includes("zippyshare")) return m.reply("link tidak valid")
const getLink_zippy = await GetLink(text)
if(getLink_zippy.error) return m.reply(`ERROR!\n\nErr : ${getLink_zippy.message}`)
try {
var name = getLink_zippy.name.split(".")
var nama = name[name.length -1]
conn.sendFile(m.chat, getLink_zippy.url, "","", m, false, { mimetype: nama, asDocument: true})
} catch (err) {
conn.reply(m.chat, `Gagal mengirim file\nMungkin size file melebihi limit Whatsapp`, m)
console.log(err)
}
}
handler.help = ["zippyshare", "zippydl" ].map(v => v + ' <url>')
handler.tags = ["downloader"]
handler.command = /^(z(ippy)?(share)?(dl)?)$/i
export default handler

