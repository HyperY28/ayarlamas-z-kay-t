const Discord = require("discord.js");
const database = require("lundb")
const fs = require("fs");
const config = require("./config.json");
const db = new database();
const client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot aktif!")
});

client.on("ready", async () => {
  console.log("Bot Başarıyla Ses Kanalına Bağlandı")
  let botVoiceChannel = client.channels.cache.get(config.settings.voiceid);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanırken bir hata oluştu!"));
});


require("./util/eventLoader")(client);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (config.settings.owner.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

client.login(config.settings.token);

//--------------commands------------------\\

client.on("guildMemberAdd", (member) => {  
  let kanal = config.id.registerchannel
  let yetkili = config.id.authorized
  let user = client.users.cache.get(member.id);

  const kurulus = new Date().getTime() - user.createdAt.getTime();  
  require("moment-duration-format");
  const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`)
  
  var kontrol;
  if (kurulus < 1296000000) kontrol = '❌'
  if (kurulus > 1296000000) kontrol = '✅'
  moment.locale("tr");

  const hg = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle(`Hoş Geldin!`)
  .setDescription(`
  :tada: **Sunucumuza Hoş Geldin !** <@` + member + `>

  **Hesabın `+ gecen +` Önce Oluşturulmuş**

  **Güvenlik Durumun: `+ kontrol +`**

 **Seninle Beraber Toplam Seninle beraber ` + member.guild.memberCount + ` Kişiyiz!**

  <@${yetkili}> **Rolündekiler Seninle İlgilenecektir**`) //yazıyı değiştirerek kullanım amacınıza uygun hale getirebilirsiniz
  .setImage(`https://media.discordapp.net/attachments/830431307145150465/830435520051937340/2db10938e684eff4443886f6573b094c.png?width=756&height=472`)

  client.channels.cache.get(kanal).send(hg)
  client.channels.cache.get(kanal).send(`<@${yetkili}>`).then(async mesaj => {
    mesaj.delete({timeout: 100})
  })
  });
 
  client.on("guildMemberAdd", (member) => {    
    let otorol = config.id.unregister
    member.roles.add(otorol)
    db.add(`giris_${member.id}` , 1)
    });
 
  client.on("message", (message) => {
    let kayıtkanal = config.id.registerchannel
    if(!kayıtkanal) return;
    if(!message.channel.id === kayıtkanal) return;
    if(message.channel.id === kayıtkanal) {
    db.add(`kayıtmesaj_${message.author.id}` , 1)
  }})