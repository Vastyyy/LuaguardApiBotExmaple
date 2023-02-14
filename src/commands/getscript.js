const { EmbedBuilder, PermissionsBitField,  } = require("discord.js");
const { codeBlock } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { LuarmorApiToken, LuarmorProjectID, ServerName, BuyerRoleID, scriptloaderURL, WhitelisterRoleID } = require('../../config.json')
const fetch = require('node-fetch')
module.exports = {
  data: new SlashCommandBuilder()
    .setName("getscript")
    .setDescription("Gets the loader for the script"),
	
    run: async (client, interaction) => {
    
  	const name = interaction.options.getString('script');
 

   const options = {
    method: 'GET',
    query: {
        'discord_id': interaction.member.id
    },
    headers: {
        'Content-Type': 'application/json',
        'Authorization': LuarmorApiToken
    },
};
const response = await fetch(`https://api.luarmor.net/v3/projects/${LuarmorProjectID}/users?discord_id=${interaction.member.id}`, options)
const data = await response.json();
console.log(data)




if (data.users == "") {

    const fail_embed = new EmbedBuilder()
    .setColor("2f3037")
.setAuthor({ name: `${ServerName} | Error` })
    .setDescription(`You are not whitelisted. If you wish to purchase open a ticket!`)
 .setFooter({ text: `Error`, iconURL: interaction.member.displayAvatarURL() })
 .setTimestamp();


    interaction.reply({ embeds: [fail_embed] })
    
} else {
  const key = data.users[0].user_key;

  
    const success_embed = new EmbedBuilder()
    .setColor("2f3037")
    .setAuthor({ name: `${ServerName} | Script` })
    .setDescription(codeBlock('lua', `script_key="${key}"\nloadstring(game:HttpGet("${scriptloaderURL}", true))()`))
    .setTimestamp()
    .setFooter({ text: `This Script Is Locked To Your Hwid, Sharing It Will Not Work!`, iconURL: interaction.member.displayAvatarURL() })
    .setTimestamp();
    interaction.user.send({ embeds: [success_embed] })

    
  

    interaction.reply("Check your messages!").catch(err => {
        console.log('error')
 });
}
    



    }
 };
