const emojis = require('../emojis.json');


exports.addRole = async (reaction, user) => {
  const member = await reaction.message.guild.members.fetch(user.id)
  if (member) {
    const role = await reaction.message.guild.roles.fetch(emojis[reaction._emoji.id].role_id);
    member.roles.add(role).catch(err => console.log('ERROR:::', err));
  }
}

exports.removeRole = async (reaction, user) => {
  const member = await reaction.message.guild.members.fetch(user.id)
  if (member) {
    const role = await reaction.message.guild.roles.fetch(emojis[reaction._emoji.id].role_id);
    member.roles.remove(role).catch(err => console.log('ERROR:::', err));
  }
}
