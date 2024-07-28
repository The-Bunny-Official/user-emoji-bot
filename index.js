const Discord = require("discord.js");
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const config = require("./config.json");

const client = new Client({
    intents: [],
    partials: []
});

client.config = config;
client.commands = new Discord.Collection();

module.exports = client;

const { loadEvents } = require("./handlers/events");

client
.login(client.config.token)
.then(() => {
    require("./handlers/interactions");
    loadEvents(client);
});