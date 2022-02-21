const fs = require('fs');
const rolemanager = require('./rolemanager')
const util = require('./utils')

let admins = ''
try { admins = JSON.parse(fs.readFileSync('./admins.json', { encoding: 'utf8', flag: 'r' })); }
catch {
  admins = { 'id': [] }
}

let users = []
try { users = JSON.parse(fs.readFileSync('./users.json', { encoding: 'utf8', flag: 'r' })); } catch { }

exports.isSuperAdmin = (user) => {
  /*check if TemeASD#1134*/
  if (user.id === '183934154558275584') return true;
  return false
}
exports.isAnAdmin = (user) => {
  /*check if TemeASD#1134*/
  if (user.id === '183934154558275584') return true;
  let value = admins.id.find(id => id === user.id)
  if (value !== undefined) return true
  return false
}

exports.addNewAdmin = (user) => {
  console.log('ADD NEW ADMIN::: ', admins)
  console.log('ADD NEW USERS::: ', user)
  admins.id = [...admins.id, user.id]
  console.log(admins)
  /*write */
  fs.writeFileSync('./admins.json', JSON.stringify(admins, null, '\t'));
}

exports.removeAdmin = (user) => {
  console.log('REMOVIND ADMINS:::  ')
  let value = admins.id.findIndex(id => id === user.id)
  if (value === -1) return false
  admins.splice(value, 1);
  fs.writeFileSync('./admins.json', JSON.stringify(admins, null, '\t'));
  return true
}

exports.getAllUsers = () => {
  return JSON.parse(fs.readFileSync('./users.json', { encoding: 'utf8', flag: 'r' }));
}
exports.addUser = (user) => {
  let obj = {
    'id': user.id,
    'roles': []
  }
  /*write */
  try {
    this.getAllUsers().push(obj)
    fs.writeFileSync('./users.json', JSON.stringify(admins, null, '\t'));
    return obj
  } catch (error) {
    console.error(error)
    return false
  }
}
exports.addRoleToUser = async (reaction, user) => {
  const member = await reaction.message.guild.members.fetch(user.id)
  if (member) {
    const role = await reaction.message.guild.roles.fetch(util.getRoleIdWithEmojiId(rolemanager.getRoles(), reaction._emoji.id));
    member.roles.add(role).catch(err => console.log('ERROR:::', err));

  }
}

exports.removeRoleFromUser = async (reaction, user) => {
  const member = await reaction.message.guild.members.fetch(user.id)
  if (member) {
    const role = await reaction.message.guild.roles.fetch(util.getRoleIdWithEmojiId(rolemanager.getRoles(), reaction._emoji.id));
    member.roles.remove(role).catch(err => console.log('ERROR:::', err));
  }
}