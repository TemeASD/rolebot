const { SlashCommandBuilder } = require('@discordjs/builders');
const messageManager = require('../libs/messagemanager.js')
const roleManager = require('../libs/rolemanager.js')
const adminManager = require('../libs/usermanager.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poista-rooli-kayttajilta')
    .setDescription('Poistaa valitun roolin kaikilta käyttäjiltä')
    .addRoleOption(option => option.setName('rooli').setDescription('Rooli joka poistetaan kaikilta')),

  async execute(interaction) {
    const role = interaction.options.getRole('rooli');
    if (!adminManager.isAnAdmin(interaction.user)) return interaction.reply({ content: `Et ole admin!`, ephemeral: true });
    if (role === null) { return interaction.reply({ content: "Rooli on pakollinen argumentti", ephemeral: true }); }
    //do-shit
    console.log(role)
    let members = await role.guild.members.list({ limit: 1000, cache: false })
    try {
      members.each(member => {
        console.log(member)
        if (member._roles.find(roleid => roleid === role.id)) {
          member.roles.remove(role).catch(err => console.log('ERROR:::', err));
        }
      })
    } catch (e) {
      return interaction.reply({ content: `Jokin meni vikkaan! ${e.message}`, ephemeral: true });
    }
    return interaction.reply({ content: 'Onnistui, roolit poistettu kaikilta löydetyiltä käyttäjiltä!', ephemeral: true });
  },
};