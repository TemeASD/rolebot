const { SlashCommandBuilder } = require('@discordjs/builders');
const messageManager = require('../libs/messagemanager.js')
const roleManager = require('../libs/rolemanager.js')
const userManager = require('../libs/usermanager.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lisaa-admin')
    .setDescription('Antaa admin oikeudet käyttää bottia')
    .addUserOption(option => option.setName('target').setDescription('Käyttäjä joka lisätään adminiksi')),
  async execute(interaction) {
    const user = interaction.options.getUser('target');
    console.log('DATA :user ', user)
    console.log('INTERACTION:::', interaction)
    if (!userManager.isAnAdmin(interaction.user)) return interaction.reply({ content: `Et ole admin!`, ephemeral: true });
    if (userManager.isAnAdmin(user)) return interaction.reply({ content: `Käyttäjä ${user.username} on jo admin!`, ephemeral: true });
    userManager.addNewAdmin(user)
    return interaction.reply({ content: `Lisätty ${user.username} adminiksi!`, ephemeral: true });
  },
};