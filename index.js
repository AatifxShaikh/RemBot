const { Client, GatewayIntentBits } = require("discord.js");
const { getRecommenations } = require("./recommendations");
const { getAnime } = require("./getAnime");
const fetchSeasonalAnime = require("./getCurrentSeasonal");
const getUpcomingSeason = require("./upcoming");
const sendHelpEmbed = require("./HelpCommand");
const getUserProfile = require("./getUser");
const { displayLeaderboard } = require("./leaderBoard");
const { getTrailer } = require("./getTrailer");
const axios = require('axios');
const { getAnimeSlash } = require("./slashCommands/getAnimeSlash");
const { getRecommenationsSlash } = require("./slashCommands/getRecommendSlash");
const { getTrailerSlash } = require("./slashCommands/getTrailerSlash");
const getSeasonalSlash = require("./slashCommands/getSeasonalSlash");
const getUpcomingSlash = require("./slashCommands/getUpcomingSlash");
const getuserSlash = require("./slashCommands/getuserSlash");
const helpSlash = require("./slashCommands/helpSlash");
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;
const guildId = process.env.GUILD_ID;

const express = require('express');
const app = express();

app.get('/health', (req, res) => res.send('Bot is running!'));
app.listen(process.env.PORT || 3000, () => console.log('Keep-alive server started.'));






const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,],
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    // if (message.content.startsWith('create')) {
    //     const url = message.content.split('create')[1]
    //     return message.reply({
    //         content: "Generating Short ID for" + url,
    //     })
    // }
    if (message.content.toLowerCase().startsWith("hi") || message.content.toLowerCase().startsWith("hey")) {
        message.reply({
            content: "Hey!",
            files: ['https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2o3Y3U4YWx6ZXk2d283MzlpanJoZHc2a2JrZTk5djF4NDd4d254cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U7njUOM8sXsru/giphy.gif']
        });
    }

    if (message.content.toLowerCase().startsWith("ass") || message.content.toLowerCase().startsWith("shit")) {
        message.reply({
            content: "",
            files: ['https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWtreXI3cXhiZnB4OGhrdTdqbmU0M21sNXlmcnI1YnhwbmU0ZjYxNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iESTt7H00chsk/giphy.gif']
        });
    }
    if (message.content.toLowerCase().startsWith("why") || message.content.toLowerCase().startsWith("who")) {
        message.reply({
            content: "",
            files: ['https://i.gifer.com/3RKs.gif']
        });
    }

    if (message.content.startsWith('!recommend')) {
        getRecommenations(message)
    }

    if (message.content.startsWith("!find")) {
        getAnime(message)
    }
    if (message.content.startsWith("!seasonal")) {
        await fetchSeasonalAnime(message)
    }
    if (message.content.startsWith("!upcoming")) {
        await getUpcomingSeason(message)
    }
    if (message.content.startsWith("!commands")) {
        await sendHelpEmbed(message)
    }
    if (message.content.startsWith("!user")) {
        await getUserProfile(message)
    }
    if (message.content.startsWith("!leaderboard")) {
        await displayLeaderboard(message);
    }
    if (message.content.startsWith("!trailer")) {
        await getTrailer(message);
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    // Slash Commands
    if (commandName === 'ping') {
        const sent = await interaction.reply({
            content: 'Pinging...',
            fetchReply: true,
        });

        // Calculate round-trip time (latency) and the WebSocket ping
        const latency = Date.now() - interaction.createdTimestamp; // Round-trip latency
        const wsPing = Math.round(client.ws.ping); // WebSocket ping

        await interaction.editReply(`Pong! Latency: ${latency}ms.`);
    } else if (commandName === 'hello') {
        await interaction.reply('Hello! How can I assist you today?');
    } else if (commandName === 'funfact') {
        const fact = await getRandomFunFact();
        await interaction.reply(fact);
    } else if (commandName === 'anime') {
        const animeName = interaction.options.getString('name'); // Get the anime name from the slash command
        await interaction.reply(`Fetching details for ${animeName}...`);

        try {
            const responseMessage = await getAnimeSlash(animeName); // Call getAnime function and pass animeName
            await interaction.editReply(responseMessage);
        } catch (error) {
            console.error(error);
            await interaction.editReply("Failed to fetch anime details. Please try again later.");
        }


    } else if (commandName === 'recommend') {
        const animeName = interaction.options.getString('name');
        // Call your getTrailer function here and send the response
        await interaction.reply(`Fetching recommendations for ${animeName}....`);
        try {
            const response = await getRecommenationsSlash(animeName); // Call the slash-compatible function
            await interaction.editReply(response);
        }
        catch (error) {
            console.error(error);
            await interaction.editReply("Failed to fetch recommendations. Please try again later.");
        }
    } else if (commandName === 'trailer') {
        const animeName = interaction.options.getString('name');
        // Call your getTrailer function here and send the response
        await interaction.reply(`Fetching trailer for ${animeName}....`);
        try {
            const response = await getTrailerSlash(animeName); // Call the slash-compatible function
            await interaction.editReply(response);
        }
        catch (error) {
            console.error(error);
            await interaction.editReply("Failed to fetch trailer. Please try again later.");
        }
    } else if (commandName === 'seasonal') {
        await getSeasonalSlash.execute(interaction)


    }
    else if (commandName === 'upcoming') {
        await getUpcomingSlash.execute(interaction)


    }
    else if (commandName === "user") {
        await getuserSlash.execute(interaction)
    }
    else if (commandName === "help") {
        await helpSlash.execute(interaction)
    }



})
client.login(token)

async function getRandomFunFact() {
    try {
        const response = await axios.get('https://quoteslate.vercel.app/api/quotes/random'); // Using quotable API for random facts
        return response.data.quote;
    } catch (error) {
        console.error(error);
        return 'Could not fetch a fun fact at the moment!';
    }
}