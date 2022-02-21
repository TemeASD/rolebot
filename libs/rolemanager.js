let emojis = ''
try {
  emojis = require('../emojis.json');
} catch {
  emojis = []
}
console.log(emojis)
const util = require('./utils')
const fs = require('fs');
let emojisOfLastCommand = []



/**
 * 
 * @param {Object} data Expects object with obj.role_id and obj.emoji_id, should also have emoji_name and role_name
 * @returns {string} possible values; EXISTS, DUPLICATE or MISSING
 */
exports.validateRoles = async (data) => {
  if (emojis[data.emoji_id] != undefined) {
    if (emojis[data.emoji_id].role_id != data.role_id) {
      return "EXISTS"
    } else {
      return "DUPLICATE_EMOJI"
    }
  }
  return "MISSING"
}

exports.createRole = async (data) => {
  emojisOfLastCommand = [...emojisOfLastCommand, data];
}

exports.addMessageIdToEmojis = (message_id) => {
  emojisOfLastCommand.forEach(emoji => {
    emoji.message_id = message_id
  })
}
exports.getRoles = () => {
  console.log('EMOJIS:::::::::::', emojis)
  return emojis;
}
exports.getRolesOfLastCommand = () => {
  return emojisOfLastCommand;
}

/**
 * shit function, does multiple things
 * writes emojis to disk, updates emoji array data and clears emojisOfLastCommand (the one where the "state" is saved)
 * practically clears the state of the command after the message has been reacted appropriately
 * @param {*} data 
 */
exports.clearRolesOfLastCommand = (data) => {
  data.forEach(role => {
    console.log('pushing role into emojis.json')
    emojis.push(role)
  })
  fs.writeFileSync('./emojis.json', JSON.stringify(emojis, null, '\t'));
  emojisOfLastCommand = ''
}

exports.getRolesByMessageId = (id) => {
  return this.getRoles.map(role => {
    if (role.message_id === id) return role
  })
}