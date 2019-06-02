const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
const talkedRecently = new Set();
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
  if (talkedRecently.has(message.author.id))
  return;

    let user = message.mentions.members.first();
	
	if (user.id === message.author.id) return message.channel.send("No puedes darte reputacion a ti mismo")
    sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${user.id}"`).then(row => {
      if (!row) return
      if (row.levelsystem === "disabled") return;

      sql.run(`UPDATE profiles SET rep = ${row.rep += 1} WHERE guildId ="${message.guild.id}" AND userId = ${user.id}`);
    message.channel.send("Usted le ha dado reputacion a este usuario, por favor espere otra hora para volver a hacerlo..")
  setTimeout(() => {
      // wait 1 hour
  }, 60 * 60000);
})
}