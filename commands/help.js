const Discord = require('discord.js');
const config = require('../config.json')
let prefix = config.settings.prefix
exports.run = async(client, message , args) => {

const lunex = new Discord.MessageEmbed()
.setColor('RANDOM')
.setDescription(`
\`${prefix}kayıt @kişi İsim Yaş\`: **Üyeyi Kayıt Eder**
\`${prefix}stats @kişi\`: **Stats Gösterir**
\`${prefix}yardım\`: **Yardım Komutlarını Gösterir**
`)
.setThumbnail(message.author.avatarURL())
message.channel.send(lunex)

  
   
  
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["help" , "yardim"], 
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: 'yardım',
  usage: 'yardım'
};
