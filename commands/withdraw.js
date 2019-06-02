const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
        let transferamount = parseInt(args[0]);
        if (transferamount <= 1) return message.channel.send("You can't withdraw anything below 1");
        if (isNaN(transferamount)) return message.channel.send("Not a valid number to withdraw");
        let taxtransfer = (transferamount / 100) * 97;
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                if (!row) return message.channel.nend("No tienes dinero en el banco.")
                if (row.bank < transferamount) return message.channel.send("No tienes suficiente dinero para sacar, tienes: $" + row.bank);
                sql.run(`UPDATE profiles SET cash = ${row.cash += taxtransfer} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                sql.run(`UPDATE profiles SET bank = ${row.bank -= transferamount} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                message.channel.send("Correctamente sacado: $" + taxtransfer + ", de tu banco, Tu nuevo saldo: $" + row.cash + ".")
            })
}
