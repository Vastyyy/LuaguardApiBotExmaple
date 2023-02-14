const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { LuarmorApiToken, LuarmorProjectID, ServerName, BuyerRoleID, scriptloaderURL, WhitelisterRoleID } = require('../../config.json')
const fetch = require('node-fetch')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("reedem-key")
        .setDescription("redeem a key user!")
       .addStringOption(option =>
		option.setName('key')
            .setRequired(true)
			.setDescription('reedem the key you got off pur.')),

    run: async (client, interaction) => {
	const optionkey = interaction.options.getString('key');
      bodys = {
        discord_id: interaction.member.id,
 user_key: optionkey
      }

      const options = {
        method: 'PATCH',
        body: JSON.stringify(bodys),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': LuarmorApiToken
        },
      };

      const response = await fetch(`https://api.luarmor.net/v3/projects/${LuarmorProjectID}/users`, options)
      const data = await response.json();
   console.log(data)
     const success_embed = new EmbedBuilder()
      .setColor("2f3037")
      .setAuthor({ name: `${ServerName} | Reedem-Key`})
      .setDescription(`Reponse: ${data.message}`)
   .setFooter({ text: `${ServerName}`, iconURL: interaction.member.displayAvatarURL() })
   .setTimestamp();
   
     const role = member.guild.roles.cache.find(role => role.id === BuyerRoleID);
member.roles.add(role);
      interaction.reply({ embeds: [success_embed] })
    }
};
