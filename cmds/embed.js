const Discord = require('discord.js');
const fs = require('fs');
let config = require('../botconfig.json');
module.exports.run = async (bot, message, args) => {
	try {
		
		let rUser = message.author;

		let permErr = new Discord.MessageEmbed()
			.setColor(`${config.errColor}`)
			.setTitle("⸝⸝ ♡₊˚ Ошибка◞")
			.setFooter(`${rUser.username}`, `${rUser.displayAvatarURL({dynamic: true})}`)
			.setDescription(`К сожалению, Вы не можете сделать это.`)
			.setTimestamp();

		if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(permErr);

		let errNoChannel = new Discord.MessageEmbed()
			.setColor(`${config.errColor}`)
			.setTitle("⸝⸝ ♡₊˚ Ошибка◞")
			.setFooter(`${rUser.username}`, `${rUser.displayAvatarURL({dynamic: true})}`)
			.setDescription(`Укажите канал, на который нужно отправить эмбед.`)
			.setTimestamp();

		const targetChannel = message.mentions.channels.first()
		if (!targetChannel) {
			message.channel.send(errNoChannel)
			return
		}

		args.shift()

		try {
			let json = JSON.parse(args.join(' '));
			if (json.image) {
				let image = json.image;
				json.image = {
					"url": `${image}`
				};
			}
			const {
				text = ''
			} = json

			let success = new Discord.MessageEmbed()
				.setColor(`${config.defaultColor}`)
				.setTitle("⸝⸝ ♡₊˚ Эмбеды◞")
				.setFooter(`${rUser.username}`, `${rUser.displayAvatarURL({dynamic: true})}`)
				.setDescription(`Сообщение было успешно отправлено в канал ${targetChannel}.`)
				.setTimestamp();

			targetChannel.send(text, {
				embed: json,
			}).then(() => {
				message.channel.send(success);
			})
		} catch (error) {
			let errInvalidJSON = new Discord.MessageEmbed()
				.setColor(`${config.errColor}`)
				.setTitle("⸝⸝ ♡₊˚ Ошибка◞")
				.setFooter(`${rUser.username}`, `${rUser.displayAvatarURL({dynamic: true})}`)
				.setDescription(`Invalid JSON ${error.message}`)
				.setTimestamp();
			message.channel.send(errInvalidJSON);
		}

	} catch (err) {
		if (err.name === "ReferenceError")
			console.log("У вас ошибка")
		console.log(`1.${err.name}\n2.${err.message}\n3.${err.stack}`);
	}
};

module.exports.help = {
	name: "embed"
};