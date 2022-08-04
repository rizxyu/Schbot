import axios from 'axios'
import cheerio from 'cheerio'

// KUMPULIN SCRAPE
// FOLLOW INSTAGRAM @rizyux
/** JOOX DL **/
function joox(query) {
    return new Promise((resolve, reject) => {
        const time = Math.floor(new Date() / 1000)
        axios.get('http://api.joox.com/web-fcgi-bin//web_search?lang=id&country=id&type=0&search_input=' + query + '&pn=1&sin=0&ein=29&_=' + time)
            .then(({ data }) => {
                let result = []
                let hasil = []
                let promoses = []
                let ids = []
                data.itemlist.forEach(result => {
                    ids.push(result.songid)
                });
                for (let i = 0; i < data.itemlist.length; i++) {
                    const get = 'http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=' + ids[i]
                    promoses.push(
                        axios.get(get, {
                            headers: {
                                Cookie: 'wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;'
                            }
                        })
                            .then(({ data }) => {
                                const res = JSON.parse(data.replace('MusicInfoCallback(', '').replace('\n)', ''))
                                hasil.push({
                                    lagu: res.msong,
                                    album: res.malbum,
                                    penyanyi: res.msinger,
                                    publish: res.public_time,
                                    img: res.imgSrc,
                                    mp3: res.mp3Url
                                })
                                Promise.all(promoses).then(() => resolve({
                                    status: true,
                                    data: hasil,
                                }))
                            }).catch(reject)
                    )
                }
            }).catch(reject)
    })
}

function jooxdl (url) {
    const URL = url.replace('https://www.joox.com/id/single/', '')
    return new Promise((resolve, reject) => {
        axios.get('http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid='+URL, {
            headers: {
                Cookie: 'wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;'
            }
            }).then(res => {
                const result = JSON.parse(res.data.replace('MusicInfoCallback(', '').replace('\n)', ''))
                const hasil = {
                    lagu: result.msong,
                    album: result.malbum,
                    penyanyi: result.msinger,
                    publish: result.public_time,
                    img: result.imgSrc,
                    mp3: result.mp3Url
                }
                resolve(hasil)
            }).catch(reject)
    })
}

/**Doujindesu**/

function doujindesu(query){
        return new Promise(async(resolve,reject) => {
          axios.get('https://doujindesu.id/?s=' + query).then(({ data }) => {
            const $ = cheerio.load(data)
            const result = [];
              $('div.animposx').get().map(b => {
              const thumb = $(b).find('img').attr('src')
              const title =  $(b).find('h2').text()
              const score = $(b).find('div.score').text()
              const status = $(b).find('div.type').text()
              const link = $(b).find('a').attr('href')
              result.push({thumb, title, score, status, link})
              });
              resolve(result)
          })
        })
}

//STICKER SEARCH
function stickerSearch(query) {
	return new Promise((resolve, reject) => {
		axios.get('https://getstickerpack.com/stickers?query='+query).then(res => {
			const $ = cheerio.load(res.data)
			const result = []
			const main = $('#stickerPacks > div > div:nth-child(3) > div > a')
       main.each( function() {
				const url = $(this).attr('href')
				const title = $(this).find('div > span').text()
				result.push({ title, url })
			})
			resolve(result)
		}).catch(reject)
	})
}
//sticker dl
function stickerDl(url) {
	return new Promise((resolve, reject) => {
		axios.get(url).then(res => {
			const $ = cheerio.load(res.data)
			const link = []
			const main = $('#stickerPack > div > div.row > div > img')
       main.each( function() {
				const result_link = $(this).attr('src').split('&d=')[0]
				const result_thumb = $('#intro > div > div > img').attr('src')
				const result_title = $('#intro > div > div > h1').text()
				link.push(result_link)	
				const result = {
					title: result_title,
					thumb: result_thumb,
					result: link
				}
			resolve(result)
			})
		}).catch(resolve)
	})
}



export { joox, jooxdl, doujindesu, stickerDl }