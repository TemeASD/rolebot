exports.checkIfCorrectEmote = async (emojis, reaction) => {
  if (emojis[reaction._emoji.id] === undefined) {
    if (reaction._emoji.id === null) {
      reaction.message.reactions.cache.get(reaction._emoji.name).remove()
        .catch(error => console.error(error))
      return false
    } else {
      reaction.message.reactions.cache.get(reaction._emoji.id).remove()
        .catch(error => console.error(error))
      return false
    }
  } return true
}