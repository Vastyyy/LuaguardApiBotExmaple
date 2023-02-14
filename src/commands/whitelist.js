const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { LuarmorApiToken, LuarmorProjectID, ServerName, BuyerRoleID, scriptloaderURL, WhitelisterRoleID } = require('../../config.json')
const fetch = require('node-fetch')
module.exports = {
  data: new SlashCommandBuilder()
    .setName("whitelist")
    .setDescription("Whitelist a user!")
    .addUserOption(option =>
      option.setName('user')
              .setRequired(true)
        .setDescription('the user to whitelist')),
 
    run: async (client, interaction) => {
      if (interaction.member.roles.cache.has(WhitelisterRoleID)) {
const member = interaction.options.getMember("user", true);
   
      bodys = {
        discord_id: member.user.id
      }

      const options = {
        method: 'POST',
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
   .setAuthor({ name: `${ServerName} | Whitelist`})
   .setDescription(`Response: ${data.message}`)
.setFooter({ text: `${serverName}`, iconURL: interaction.guild.iconURL() })
.setTimestamp();

      const role = member.guild.roles.cache.find(role => role.id === BuyerRoleID);
member.roles.add(role);
   interaction.reply({ embeds: [success_embed] })
    } else {
      const success_embed = new EmbedBuilder()
      .setColor("2f3037")
      .setAuthor({ name: `${ServerName} | Error`})
      .setDescription(`You do not have permisson to do that.`)
   .setFooter({ text: `Error`, iconURL: interaction.member.displayAvatarURL() })
   .setTimestamp();
   
     
      interaction.reply({ embeds: [success_embed] })
  }

    }
 };
