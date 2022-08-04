 import { joox } from "../lib/scrape.js"

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example ${usedPrefix}${command} Janji`
let result = (await joox(args[0])).data[0]

const { lagu, album, penyanyi, publish, img, mp3} = result
console.log(result)
//coonn.sendButton(m.chat, "THIS FEATURE DOESN'T EXIST", author, null, [["Back", ".menu"]], m)
conn.sendFile(m.chat, img, "", "*JOOX DOWNLOADER(BETA)*\n\n" + "*Judul:* "  + lagu + "\n*Album:* " + album + "\n*Penyanyi* " + penyanyi + "\n*Dipublikasi* " + publish, m )
await conn.sendFile(m.chat, mp3, lagu + ".mp3", null, m, null, { asDocument: true })
}

handler.help = ['jooxs'].map(v => v + ' <judul>')
handler.tags = ['downloader']

handler.command = /^jooxs$/i

export default handler
