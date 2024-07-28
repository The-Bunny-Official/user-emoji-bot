const { Client, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const axios = require("axios");

module.exports = {
    name: "add-emoji",
    built: false,
    data: {
        name: "add-emoji",
        description: "Add an emoji to the list",
        type: 1,
        integration_types: [0, 1],
        contexts: [0, 1, 2],
        options: [
            {
                name: "emoji",
                description: "Emoji name to send",
                type: 3,
                required: true
            },
            {
                name: "image",
                description: "Emoji Image to upload",
                type: 11,
                required: true
            }
        ]
    },
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client){
        const fetch = (await import('node-fetch')).default;
        
        const eName = interaction.options.getString("emoji");
        const eAttachment = interaction.options.getAttachment("image");

        const NotImage = new EmbedBuilder()
        .setTitle("An Error Occurred")
        .setDescription("The file you uploaded was not a `jpeg`, `png`, or `gif`")
        .setColor("Red")
        .setTimestamp();

        const TooBig = new EmbedBuilder()
        .setTitle("An Error Occurred")
        .setDescription("The file you uploaded is too big.\nMake sure is at most 750x750 and less than 256kb.")
        .setColor("Red")
        .setTimestamp();

        if (!["jpeg", "png", "gif"].includes(eAttachment.contentType.split("/")[1])) return interaction.reply({ embeds: [NotImage], ephemeral: true });
        if(eAttachment.size >= 256000) return interaction.reply({ embeds: [TooBig], ephemeral: true });
        if(eAttachment.width > 750 || eAttachment.height > 750) return interaction.reply({ embeds: [TooBig], ephemeral: true });

        const response = await fetch(eAttachment.url);
        const bufferArray = await response.arrayBuffer()
        const buffer = Buffer.from(bufferArray);
        const Image64 = buffer.toString('base64');

        const ImageData = `data:${eAttachment.contentType};base64,${Image64}`;

        const emojiPush = await axios({
            method: 'post',
            url: `https://discord.com/api/v10/applications/${client.user.id}/emojis`,
            data: {
                name: eName,
                image: ImageData
            },
            headers: {
                Authorization: `Bot ${client.config.token}`
            }
        });
        
        const success = new EmbedBuilder()
        .setTitle("Success!")
        .setDescription(`The emoji "${emojiPush.data.name}" was successfully created!\nID: ${emojiPush.data.id}`)
        .setColor("Green")
        .setTimestamp();

        return await interaction.reply({ embeds: [success], ephemeral: true });
    }
}