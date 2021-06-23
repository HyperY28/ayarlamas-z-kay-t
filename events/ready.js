const discord = require('discord.js');
const config = require("../config.json")

module.exports = client => {

    let durum = config.settings.status
    client.user.setActivity(`${durum}`);
    client.user.setStatus("online"); //dnd, idle, online
  
}