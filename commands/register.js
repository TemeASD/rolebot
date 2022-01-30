const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user-info')
    .setDescription('Display info about yourself.'),
  async execute(interaction) {
    console.log(interaction.user)
    return interaction.reply({ content: `Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`, ephemeral: true });
  },
};