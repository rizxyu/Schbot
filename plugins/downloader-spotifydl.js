import { Spotify } from "spotifydl-core"
import canva from "canvacord"

let handler = async (m, { conn, args, usedPrefix, command }) => {
/**Client To get Access**/
const spotify = new Spotify({
    clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
    clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009'
})
//Text
if (!args[0]) throw 'where link'

try {
  //Toget Track
let kp = await spotify.getTrack(args[0])
let kp2 = await spotify.downloadTrack(args[0])

var res = {
creator: "Follow IG: rizxyux",
judul: kp.name,
artis: kp.artists,
album: kp.album_name,
rilis: kp.release_date,
thumb: kp.cover_url,
audio: kp2
}

//Biar simpel
const { judul, album, artis, rilis, thumb, audio } = res

let spo = new canva.Spotify()
        .setAuthor(`${artis}`)
        .setAlbum(album)
        .setStartTimestamp(Date.now() - 10000)
        .setEndTimestamp(Date.now() + 50000)
        .setImage(thumb)
        .setBackground("IMAGE","https://b-static.besthdwallpaper.com/solo-leveling-sung-jin-woo-dual-daggers-wallpaper-2560x1080-88318_14.jpg")
        .setTitle(judul);

    spo.build()
        .then(data => {
            conn.sendFile(m.chat, data, judul +'.jpg', `*SPOTIFY DOWNLOADER*
\n*Judul:* ${judul}
*Artis:* ${artis}
*Album:* ${album}
*Dipublish:* ${rilis}

Jangan Lupa Dukung Kami
https://trakteer.id/rizxyugnxng`, m)
        });

await conn.sendFile(m.chat, audio, judul + ".mp3", null, m, null, { asDocument: true})

} catch (e) {
m.reply('Cannot Get trackk lmfaooo')
}
}
handler.help = ['spotifydl'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(spotify(dl)?)$/i
export default handler
