const discord = require('discord.js');
const database = require("lundb")

const config = require("../config.json")

exports.run = async(client, message, args) => {

let kanal = config.id.registerchannel
let kayıtsız = config.id.unregister
let üye = config.id.member
let yetkili = config.id.authorized
let log = config.id.log

const yetki = new discord.MessageEmbed()
.setColor("RED")
.setTitle("Hata!")
.setDescription(`Bu Komutu Kullanmak İçin <@&${yetkili}> Rolüne Sahip Olmalısın`)
.setThumbnail(`${message.author.avatarURL()}`)

const kanalayarla = new discord.MessageEmbed()
.setColor("RED")
.setTitle("Hata!")
.setDescription(`Kayıt Kanalını Ayarla!`)
.setThumbnail(`${message.author.avatarURL()}`)

const kayıtkanal = new discord.MessageEmbed()
.setColor("RED")
.setTitle("Hata!")
.setDescription(`Bu Komutu Sadece <#${kanal}> Kanalında Kullanabilirsiniz!`)
.setThumbnail(`${message.author.avatarURL()}`)

const üyerol = new discord.MessageEmbed()
.setColor("RED")
.setTitle("Hata!")
.setDescription(`Üye Rol Ayarla!`)
.setThumbnail(`${message.author.avatarURL()}`)

const logkanal = new discord.MessageEmbed()
.setColor("RED")
.setTitle("Hata!")
.setDescription(`Log Kanal Ayarla!`)
.setThumbnail(`${message.author.avatarURL()}`)

const kayıtsızrol = new discord.MessageEmbed()
.setColor("RED")
.setTitle("Hata!")
.setDescription(`Kayıtsız Rol Ayarla!`)
.setThumbnail(`${message.author.avatarURL()}`)

const belirt = new discord.MessageEmbed()
.setColor("RED")
.setTitle("Hata!")
.setDescription(`Birini Etiketle!`)
.setThumbnail(`${message.author.avatarURL()}`)

const isimbelirt = new discord.MessageEmbed()
.setColor("RED")
.setTitle("Hata!")
.setDescription(`Bir İsim Belirt!`)
.setThumbnail(`${message.author.avatarURL()}`)

const yasbelirt = new discord.MessageEmbed()
.setColor("RED")
.setTitle("Hata!")
.setDescription(`Bir Yaş Belirt!`)
.setThumbnail(`${message.author.avatarURL()}`)

const yetkilirol = new discord.MessageEmbed()
.setColor("RED")
.setTitle("Hata!")
.setDescription(`Yetkili Rolü Ayarla!`)
.setThumbnail(`${message.author.avatarURL()}`
)


if(!kanal) return message.channel.send(kanalayarla).then(async mesaj => {
  message.delete()
  await mesaj.react('⛔')
  mesaj.delete({ timeout: 5000 })
})
if(!yetkili) return message.channel.send(yetkilirol)
.then(async mesaj => {
  message.delete()
  await mesaj.react('⛔')
  mesaj.delete({ timeout: 5000 })
})

if(!log) return message.channel.send(logkanal)
.then(async mesaj => {
  message.delete()
  await mesaj.react('⛔')
  mesaj.delete({ timeout: 5000 })
})
if(!kayıtsız) return message.channel.send(kayıtsızrol)
.then(async mesaj => {
  message.delete()
  await mesaj.react('⛔')
  mesaj.delete({ timeout: 5000 })
})
if(!message.member.roles.cache.has(yetkili)) return message.channel.send(yetki)
.then(async mesaj => {
  message.delete()
  await mesaj.react('⛔')
  mesaj.delete({ timeout: 5000 })
})
if(message.channel.id !== kanal) return message.channel.send(kayıtkanal)
.then(async message => {
  message.delete()
  await message.react('⛔')})
  message.delete({ timeout: 5000 })
if (!üye) return message.channel.send(üyerol).then(async mesaj => {
  message.delete()
  await mesaj.react('⛔')
  mesaj.delete({ timeout: 5000 })
})

let member = message.mentions.members.first();
let kayıtolma = db.fetch(`kayıtolma_${member.id}`)
if (!member) return message.channel.send(belirt).then(async mesaj => {
  message.delete()
  await mesaj.react('⛔')
  mesaj.delete({ timeout: 5000 })
})
let isim = args[1]
if (!isim) return message.channel.send(isimbelirt).then(async mesaj => {
  message.delete()
  await mesaj.react('⛔')
  mesaj.delete({ timeout: 5000 })
})
let yaş = args[2]
if (!yaş) return message.channel.send(yasbelirt).then(async mesaj => {
  message.delete()
  await mesaj.react('⛔') 
  mesaj.delete({ timeout: 5000 })
})
  
member.setNickname(`${isim} | ${yaş}`)
member.roles.remove(kayıtsız)
member.roles.add(üye)

db.add(`kayıtsayı_${message.author.id}`, 1)
db.add(`kayıtolma_${member.id}` , 1)

let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`)
const lunex = new discord.MessageEmbed()
.setColor('GREEN')
.setTitle(`Başarılı Kayıt İşlemi!`)
.setDescription(`Kayıt Edilen Kullanıcı: ${member} \nYetkili: <@!${message.author.id}> \nYetkili Kayıt Sayısı: **${kayıtsayı ? `${kayıtsayı}` : "0"}** \nKullanıcının Önceki Kayıt Olma Sayısı: **${kayıtolma ? `${kayıtolma}` : "0"}**`)
.setThumbnail(member.user.avatarURL())

message.channel.send(lunex).then(async mesaj => {
  await mesaj.react('✅')})

client.channels.cache.get(log).send(lunex).then(async mesaj => {
  await mesaj.react('✅')})

}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['k' , "register"],
  permlevel: 0
}
exports.help = {
  name: 'kayıt',
  description: 'kayıt',
  usage: ''
}
