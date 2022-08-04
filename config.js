import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'

/**Owner number**/
global.owner = [
  ['6283190403329'],
  ['6281313312123'],
  ['6282180530633'],
  ['6282328303332', 'Limau', true]
  // [number, dia creator/owner?, dia developer?]
] // Put your number here
global.mods = [] // Want some help?
global.prems = [] // Premium user has unlimited limit
global.girlfren = ["Reren"] // Your gf/pacar

global.APIs = { // API Prefix
  // name: 'https://website'
  nrtm: 'https://nurutomo.herokuapp.com',
  bg: 'http://bochil.ddns.net',
  xteam: 'https://api.xteam.xyz',
  zahir: 'https://zahirr-web.herokuapp.com',
  zeks: 'https://api.zeks.xyz',
  pencarikode: 'https://pencarikode.xyz',
  LeysCoder: 'https://leyscoders-api.herokuapp.com',
  zenz: 'https://zenzapis.xyz',
  skyz: 'https://skyz-api.herokuapp.com'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://api.zeks.xyz': 'apivinz',
  'https://pencarikode.xyz': 'pais',
  'https://leyscoders-api.herokuapp.com': 'dappakntlll',
  'https://zenzapis.xyz': 'BagasPrdn'
}

// Sticker WM
global.packname = 'Use Bot 6287724225921'
global.author = 'SCH BOT ig:rizxyux'
global.wm = "Adventure pitur"
global.multiplier = 69 // The higher, The harder levelup

//
global.eror = 'eror bodo'
global.wait = 'Process...'
global.render = 'wait render'
global.webs = 'https://rizxyu.github.io/sxzyweb/'
global.logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKsHEAITWM7dPQ_irYtNvZ1hiM_zj4tZ4f6A&usqp=CAU"
global.gcwangsaf = "https://wa.me/6282328303332"
global.github = "https://github.com/Rizxyu/"

//Donasi
global.saweria = "https://www.saweria.co/sxzy"
global.dana = ["6282328303332"]
global.pulsa = [
["6282328303332"], 
["6281375308383"]
]
global.trakteer = "https://trakteer.id/rizxyugnxng/tip"//Link url https://
global.paypal = "rizkynursanto48@gmail.com"//paypal email
global.gopay = "082328303332"//Numver for Payment digital Gopay Gojek


//Rpg
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      level: '🧬',
      limit: '🌌',
      health: '❤️',
      strength: '🦹‍♀️',
      mana: '🪄',
      stamina: '⚡',
      agility: '🤸‍♂️',
      intelligence: '🧠',
      exp: '✉️',
      pointxp: '📧',
      money: '💵',
      potion: '🥤',
      gems: '🍀',
      crystal: '🔮',
      diamond: '💎',
      darkcrystal: '♠️',
      common: '📦',
      uncommon: '🎁',
      mythic: '🗳️',
      legendary: '🗃️',
      pet: '🎁',
      trash: '🗑',
      armor: '🥼',
      sword: '🗡️',
      arc: '🏹',
      bow: '🏹',
      magicwand: '⚕️',
      keyiron: '🗝️',
      keygold: '🔑',
      knife: '🔪',
      wood: '🪵',
      rock: '🪨',
      string: '🕸️',
      horse: '🐎',
      cat: '🐈',
      dog: '🐕',
      fox: '🦊',
      cow: '🐄',
      bull: '🐃',
      tiger: '🐅',
      lion: '🦁',
      giraffe: '🦒',
      elephant: '🐘',
      snake: '🐍',
      dragon: '🐉',
      chicken: '🐓',
      petFood: '🍖',
      iron: '⛓️',
      gold: '👑',
      emerald: '💚'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]
  }
}


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
