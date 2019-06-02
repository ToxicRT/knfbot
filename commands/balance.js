const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
      var user = message.mentions.users.first() || message.author;
  
    sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${user.id}"`).then(row => {  
      
      if (!row) return message.channel.send("El usuario necesita hablar primero.")

       var embed = new Discord.RichEmbed()
       .setTitle('Saldo')
       .setDescription(`**${user.username}**\n  **:dollar: Saldo:\n$${row.cash}**\n:bank: **Banco**\n$**${row.bank}**`)
       .setColor('#ffffff')
       .setFooter('Pedido por: ' + message.author.tag, message.author.avatarURL)
       
       message.channel.send(embed)
    
    })
}
