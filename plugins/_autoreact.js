/**
import db from '../lib/database.js'


export async function all(m) {
  if (m.chat.endsWith('broadcast') || m.fromMe || db.data.settings[this.user.jid].group) return

 
    this.sendMessage(m.chat, {
    	react: {
    		text: "😄",
    		key: m.key
    	}
    })	

}