const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require('node-fetch')
const { LuarmorApiToken, LuarmorProjectID, ServerName, BuyerRoleID, scriptloaderURL, WhitelisterRoleID } = require('../../config.json')
module.exports = {
  data: new SlashCommandBuilder()
    .setName("blacklist")
    .setDescription("Blacklist a user!")
    .addUserOption(option =>
      option.setName('user')
              .setRequired(true)
        .setDescription('the user to whitelist')),
 
    run: async (client, interaction) => {
        if (interaction.member.roles.cache.has(WhitelisterRoleID)) {
        const member = interaction.options.getMember("user", true);

const getkey = {
    method: 'GET',
    query: {
        'discord_id': member.user.id
    },
    headers: {
        'Content-Type': 'application/json',
        'Authorization': LuarmorApiToken
    },
};
const keyresponse = await fetch(`https://api.luarmor.net/v3/projects/${LuarmorProjectID}/users?discord_id=${member.user.id}`, getkey).catch(err => {
    console.log('error')
});
const keydata = await keyresponse.json()
console.log(keydata)
if (keydata.users == "") {
    const success_embed = new EmbedBuilder()
    .setColor("2f3037")
    .setAuthor({ name: `${ServerName} | Error`})
    .setDescription(`Reponse: User is not whitelisted.`)
 .setFooter({ text: `Error getting script`, iconURL: interaction.guild.iconURL() })
 .setTimestamp();
 
   
    interaction.reply({ embeds: [success_embed] })
 
} else {
    key = keydata.users[0].user_key
    const options = {
        method: 'DELETE',
        
        headers: {
            'Content-Type': 'application/json',
            'Authorization': LuarmorApiToken
        },
      };
      const response = await fetch(`https://api.luarmor.net/v3/projects/${LuarmorProjectID}/users?user_key=${key}`, options).catch(err => {
       console.log('error')
});
      const data = await response.json();


   const success_embed = new EmbedBuilder()
   .setColor("2f3037")
   .setAuthor({ name: `${ServerName} | Blacklist`})
   .setDescription(`Response: ${data.message}`)
.setFooter({ text: ServerName, iconURL: interaction.guild.iconURL() })
.setTimestamp();

    const role = member.guild.roles.cache.find(role => role.id === BuyerRoleID);
member.roles.remove(role);
  
   interaction.reply({ embeds: [success_embed] })

}









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
