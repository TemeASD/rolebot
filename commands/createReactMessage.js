const { SlashCommandBuilder } = require('@discordjs/builders');
const messageManager = require('../libs/messagemanager.js')
const roleManager = require('../libs/rolemanager.js')
const adminManager = require('../libs/usermanager.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('luo-viesti')
    .setDescription('Luo viestin, jonka avulla botti antaa rooleja')
    .addChannelOption(option => option.setName('kanava').setDescription('Kanava, jonne viesti lähetetään'))
    .addRoleOption(option => option.setName('rooli-1').setDescription('Ensimmäinen rooli'))
    .addStringOption(option => option.setName('emoji-1').setDescription('Ensimmäinen emoji'))
    .addRoleOption(option => option.setName('rooli-2').setDescription('Toinen rooli'))
    .addStringOption(option => option.setName('emoji-2').setDescription('Toinen emoji'))
    .addRoleOption(option => option.setName('rooli-3').setDescription('Kolmas rooli'))
    .addStringOption(option => option.setName('emoji-3').setDescription('Kolmas emoji'))
    .addRoleOption(option => option.setName('rooli-4').setDescription('Neljäs rooli'))
    .addStringOption(option => option.setName('emoji-4').setDescription('Neljäs emoji')),

  async execute(interaction) {
    const role1 = interaction.options.getRole('rooli-1');
    const emoji1 = interaction.options.getString('emoji-1');
    const role2 = interaction.options.getRole('rooli-2');
    const emoji2 = interaction.options.getString('emoji-2');
    const role3 = interaction.options.getRole('rooli-3');
    const emoji3 = interaction.options.getString('emoji-3');
    const role4 = interaction.options.getRole('rooli-4');
    const emoji4 = interaction.options.getString('emoji-4');
    const channel = interaction.options.getChannel('kanava');

    /*
    TODO: add channel id to allow deletion
    TODO: add message per channel feature
    */
    if (!adminManager.isAnAdmin(interaction.user)) return interaction.reply({ content: `Et ole admin!`, ephemeral: true });
    let args = { roles: [], channel }
    if (channel === null) { return interaction.reply({ content: "Kanavan on pakollinen argumentti", ephemeral: true }); }
    if (emoji1 !== null && role1 !== null) args.roles.push({ "emoji": emoji1, "role_id": role1?.id })
    if (emoji2 !== null && role2 !== null) args.roles.push({ "emoji": emoji2, "role_id": role2?.id })
    if (emoji3 !== null && role3 !== null) args.roles.push({ "emoji": emoji3, "role_id": role3?.id })
    if (emoji4 !== null && role3 !== null) args.roles.push({ "emoji": emoji4, "role_id": role4?.id })
    if (args.roles.length === 0) return interaction.reply({ content: 'Tarvitset ainankin yhden rooli, emoji parin.', ephemeral: true });
    if (!messageManager.sendSubRoleMessage(args)) return interaction.reply({ content: 'Jokin meni vikaan. Varmista, että roolit ja emojit mätsäävät, ja niitä ei käytetä jo toisessa viestissä.', ephemeral: true });
    return interaction.reply({ content: 'Viesti luotu!', ephemeral: true });
  },
};