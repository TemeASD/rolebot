const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const emojis = require('../emojis.json');


exports.getBotMessages = () => {
  return JSON.parse(fs.readFileSync('./messages.json', { encoding: 'utf8', flag: 'r' }))
}

exports.setBotMessages = (message) => {
  const messagesInAFile = JSON.parse(fs.readFileSync('./messages.json', { encoding: 'utf8', flag: 'r' }))
  messagesInAFile.push(message)
  fs.writeFileSync('./messages.json', JSON.stringify(messagesInAFile, null, '\t'));
}

exports.sendBotMessages = async (client, channel) => {
  console.log('send some messages');
  console.log('get the ids on message create event')
  const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Choose your role')
    .setAuthor('Role Bot', 'https://acrlonline.org/templates/g5_helium/custom/images/acrlrlogo.png', 'https://www.acrlonline.org')
    .setDescription('Set your role by reacting to this message. React "Drivers" to gain access to the rest of the server. If you want, react one or more of "AC", "ACC", "ENDU" to get notifications from moderators about sessions and events on those categories')

  for (emoji in emojis) {
    let rolename = emojis[emoji].role_name.toString()
    let emojiname = emojis[emoji].emoji_name.toString()
    console.log(typeof (emojiname))
    console.log(emojiname, rolename)
    exampleEmbed.addField(rolename.toString(), emojiname.toString(), true)
  }
  channel.send({ embeds: [exampleEmbed] });

}