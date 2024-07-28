const { Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const axios = require("axios");

module.exports = {
    name: "view-emojis",
    built: false,
    data: {
        name: "view-emojis",
        description: "View available emojis.",
        integration_types: [0, 1],
        contexts: [0, 1, 2]
    },
    /**
     * <:M_cat_gun:1067571786314678302>
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        let emojiNames = []
        const response = await axios({
            method: 'get',
            url: `https://discord.com/api/v10/applications/${client.user.id}/emojis`,
            headers: {
                Authorization: `Bot ${client.config.token}`
            }
        });

        const emojis = response.data.items;
        for (let emoji of emojis){
            emojiNames.push(emoji.name);
        }

        let formatted = ""
        for(let name of emojiNames){
            formatted += `${name}\n`
        }

        const listed = new EmbedBuilder()
        .setTitle("Emoji List")
        .setDescription(`Emojis:\n${formatted}`)
        .setColor("Green")
        .setTimestamp();

        await interaction.reply({ embeds: [listed] });
    }
}