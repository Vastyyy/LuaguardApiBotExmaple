const { ActivityType } = require("discord.js")
const { BotStatus } = require('../../config.json')
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
 
   client.user.setActivity({ name: BotStatus, type: ActivityType.Listening })
}};
