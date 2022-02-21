const fs = require('fs');
const { MessageEmbed } = require('discord.js');
const roleManager = require('./rolemanager');
const util = require('./utils')

exports.getBotMessages = () => {
  try {
    let messages = JSON.parse(fs.readFileSync('./messages.json', { encoding: 'utf8', flag: 'r' }));
    return messages;
  }
  catch {
    //return empty object, because thats what the code expects
    return [{}]
  }
}

exports.setBotMessages = (message) => {
  let messagesInAFile
  try {
    messagesInAFile = JSON.parse(fs.readFileSync('./messages.json', { encoding: 'utf8', flag: 'r' }))
  } catch {
    messagesInAFile = []
  }
  messagesInAFile.push(message)
  fs.writeFileSync('./messages.json', JSON.stringify(messagesInAFile, null, '\t'));
}

/*
exports.sendBotMessages = async (client, channel) => {
  console.log('send some messages');
  console.log('get the ids on message create event')
  const exampleEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Choose your role')
    .setAuthor('Role Bot', 'https://acrlonline.org/templates/g5_helium/custom/images/acrlrlogo.png', 'https://www.acrlonline.org')
    .setDescription('Set your roles by reacting to this message. YOU MUST react "Drivers" to gain access to the rest of the server. This is extra important! If you want, react one or more of "Assetto Corsa 1", "AC Competizione", "ENDURANCE" and "RALLY" to get notifications from moderators about sessions and events on those categories')
  for (emoji in emojis) {
    let rolename = emojis[emoji].role_name.toString()
    let emojiname = emojis[emoji].emoji_name.toString()
    exampleEmbed.addField(rolename.toString(), emojiname.toString(), true)
  }
  channel.send({ embeds: [exampleEmbed] });

}*/

exports.sendSubRoleMessage = async (commandArgs) => {
  for (let role of commandArgs.roles) {
    role.emoji_id = util.emojiIdFromName(role.emoji)
    let newRole = util.constructRoleData(role)
    switch (await roleManager.validateRoles(newRole)) {
      case 'VALID':
        /*TODO: no need to create, can use existing*/
        console.info('sendSubRoleMessage::: VALID')
        return false
        break
      case 'DUPLICATE_EMOJI':
        /*rolecombo with that emoji exists, respond with a message to channel*/
        console.info('sendSubRoleMessage::: DUPLICATE EMOJI')
        return false
        break
      case 'MISSING':
        /*have to create the role emoji kombo*/
        console.info('sendSubRoleMessage::: CREATING A ROLE-EMOJI COMBO')
        await roleManager.createRole(newRole)
        break
    }

  }
  const messageEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Valitse rooli, jonka haluat ')
    .setAuthor('Roolibotti!', 'https://rushmode.gg/static/media/educationalmasters_merkki_gold.d37d01ff.png', 'https://rushmode.gg/educationalmasters')
    .setDescription('Reagoi tähän viestiin rooli, jonka haluat.')
  commandArgs.channel.send({ embeds: [messageEmbed] });
}
exports.removeMessage = (channel) => {
  /*Get messageid from the messages.json based on the channelid */
  let messageid = this.getBotMessages().find(message => { channel.id = message.channelid });
  /*Get array of roles from the emojis.json document, based on the message id*/
  let rolesToRemove = roleManager.getRolesByMessageId(messageid)
  /*Get list of users, who match the with each of the roles arrays element*/
  /* 
  rolesToRemove =   {
    emoji_id: '894154247967477780',
    role_name: 'undefined',
    role_id: '894156100683833394',
    emoji_name: '<:win95:894154247967477780>',
    message_id: '943588677009956966'
  } x N
  */
  /*
  Gotta create a function that saves a document like
  user: discord-id
  roles: [];
  */
  /*Use rolemanager.removeRoleFromUser(). Needs users id and the emoji_id*/
  /*Delete the message*/
}