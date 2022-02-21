const { SlashCommandBuilder } = require('@discordjs/builders');
const messageManager = require('../libs/messagemanager.js')
const roleManager = require('../libs/rolemanager.js')
const userManager = require('../libs/usermanager.js')
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tyhjenna-botti')
    .setDescription('Tyhjentää botin sisällön täydellisesti'),
  async execute(interaction) {
    if (!userManager.isSuperAdmin(interaction.user)) return interaction.reply({ content: `Et ole admin! Ota yhteyttä TemeASD#1134 jos haluat ajaa tämän komennon`, ephemeral: true });
    try {
      fs.unlinkSync('./emojis.json')
      fs.unlinkSync('./messages.json')
    } catch (e) {
      console.log(e)
      return interaction.reply({ content: `Jotain meni pieleen, ota yhteyttä TemeASD#1134!`, ephemeral: true });
    }
    return interaction.reply({ content: `Botti tyhjätty!`, ephemeral: true });
  },
};