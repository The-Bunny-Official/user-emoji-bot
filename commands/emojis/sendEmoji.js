const { Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const axios = require("axios");

module.exports = {
    name: "send-emoji",
    built: false,
    data: {
        name: "send-emoji",
        description: "Send an emoji from the list",
        type: 1,
        integration_types: [0, 1],
        contexts: [0, 1, 2],
        options: [
            {
                name: "emoji",
                description: "Emoji name to send",
                type: 3,
                required: true
            }
        ]
    },
    /**
     * <:M_cat_gun:1067571786314678302>
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        const eName = interaction.options.getString("emoji");
        let emoji = {}
        const response = await axios({
            method: 'get',
            url: `https://discord.com/api/v10/applications/${client.user.id}/emojis`,
            headers: {
                Authorization: `Bot ${client.config.token}`
            }
        });

        const emojis = response.data.items;
        for (let e of emojis){
            if(e.name == eName) emoji = e
        }
        
        const NotFound = new EmbedBuilder()
        .setTitle("Not Found")
        .setDescription("An emoji by that name could not be found.")
        .setColor("Red")
        .setTimestamp();

        if(!emoji) return interaction.reply({ embeds: [NotFound], ephemeral: true });

        interaction.reply({ content: `<:${emoji.name}:${emoji.id}>` });
    }
}