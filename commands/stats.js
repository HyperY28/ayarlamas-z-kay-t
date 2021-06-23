const discord = require('discord.js');
const { JsonDatabase } = require("wio.db");
const db = new JsonDatabase("database.json");

exports.run = async(client , message , args) => {
    let member = message.mentions.members.first();
    let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`)
    let kayıtmesaj = db.fetch(`kayıtmesaj_${message.author.id}`)
    let giris = db.fetch(`giris_${message.author.id}`)
    let kayıtolma = db.fetch(`kayıtolma_${message.author.id}`)
    if(kayıtsayı === null) kayıtsayı = 0
    if(kayıtmesaj === null) kayıtmesaj = 0
    if(giris === null) giris = 0
    if(kayıtolma === null) kayıtolma = 0

    if(!member) {
    const lunex = new discord.MessageEmbed()
    .setColor("GREEN")
    .setTitle(`İstatisliklerin!`)
    .setDescription(`
    Kayıt Etme Sayısı: **${kayıtsayı}**
    Kayıt Kanalındaki Mesaj: **${kayıtmesaj}**
    Sunucuya Girme Sayısı: **${giris}**
    Toplam Kayıt Olma: **${kayıtolma}**
    `)
    .setFooter(`Kayıt | Stats`) //lunex X themechanics

    
    message.channel.send(lunex)}
    
    if(member) {
        let kayıtsayı2 = db.fetch(`kayıtsayı_${member.id}`)
        let kayıtmesaj2 = db.fetch(`kayıtkanalmesaj_${member.id}`)
        let giris2 = db.fetch(`giris_${member.id}`)
        let kayıtolma = db.fetch(`kayıtolma_${member.id}`)
        if(kayıtsayı2 === null) kayıtsayı2 = 0
        if(kayıtmesaj2 === null) kayıtmesaj2 = 0
        if(giris2 === null) giris2 = 0
        if(kayıtolma === null) kayıtolma = 0
        
        const lunex = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`Stats`)
        .setDescription(`
        Kayıt Sayısı: **${kayıtsayı2}**
        Kayıt Kanalındaki Mesaj: **${kayıtmesaj2}**
        Sunucuya Girme Sayısı: **${giris2}**
        Toplam Kayıt Olma: **${kayıtolma}**
        `)
        .setFooter(`Kayıt | Stats`)
        
        message.channel.send(lunex)
    }}

exports.conf = {
    enabled: true,
    guildonly: false,
    aliases: ['stat', 'i' , "istatislik"],
    permlevel: 0
  }
  exports.help = {
    name: 'stats',
    description: 'stats',
    usage: 'stats'
  }