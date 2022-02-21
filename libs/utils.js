exports.checkIfCorrectEmote = async (emojis, reaction) => {
  let role = emojis.find(emoji => reaction._emoji.id === emoji.emoji_id)
  if (role === undefined) {
    console.log('ROLE UNDEFINED')
    if (reaction._emoji.id === null) {
      console.log('EMOJI ID NULL')
      reaction.message.reactions.cache.get(reaction._emoji.name).remove()
        .catch(error => console.error(error))
      return false
    } else {
      console.log('REMOVE EMOJI BY NAME')
      reaction.message.reactions.cache.get(reaction._emoji.id).remove()
        .catch(error => console.error(error))
      return false
    }
  } else {
    if (role.message_id !== reaction.message.id) {
      console.log('ROLE FOUND, MESSAGE WRONG THO')
      reaction.message.reactions.cache.get(reaction._emoji.id).remove()
        .catch(error => console.error(error))
      return false
    }
    /*all should be good*/
    console.log('ROLE FOUND, MESSAGE CORRECT')
    return true
  }
}

exports.emojiIdFromName = (emojiName) => {
  /*this is bad code, leaving it here for comedic purposes
    correct solution would be
    return emojiName.split(':').pop().slice(0, -1)
  */
  let emoji_id = []
  for (let i = emojiName.length - 2; i != 0; i--) {
    if (emojiName[i] === ":") break;
    emoji_id.push(emojiName[i]);
  }
  return emoji_id.reverse().join("")
}

exports.constructRoleData = (data) => {
  let constructedValues = `{"emoji_id": "${data.emoji_id}", "role_name": "${data.role_name}", "role_id": "${data.role_id}", "emoji_name": "${data.emoji}"}`
  return JSON.parse(constructedValues)
}

exports.getRoleIdWithEmojiId = (json, string) => {
  console.log('at function')
  console.log(json, string)
  for (const role of json) {

    console.log('going through functions', role.emoji_name);
    if (role.emoji_id === string) {
      console.log('MATCHMATCHMATCHMATCH')
      console.log(role.emoji_id, string, 'ROOLI: ', role.role_id)
      return role.role_id
    }
  }
}
