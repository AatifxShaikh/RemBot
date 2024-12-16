const { SlashCommandBuilder } = require('discord.js');
const { getTrailerSlash } = require('./slashCommands/getTrailerSlash'); // Ensure path is correct
const { clientId, guildId, token } = require('./config.json'); // Get your client ID, guild ID, and token

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    new SlashCommandBuilder().setName('hello').setDescription('Say hello to the bot!'),
    new SlashCommandBuilder().setName('funfact').setDescription('Get a random fun fact!'),
    new SlashCommandBuilder().setName('anime').setDescription('Get anime details').addStringOption(option =>
        option
            .setName('name')
            .setDescription('The name of the anime')
            .setRequired(true)
    ),
    new SlashCommandBuilder()
        .setName('recommend')
        .setDescription('Get anime recommendations')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Name of the anime')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('trailer')
        .setDescription('Fetch the trailer of an anime')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('The name of the anime')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('seasonal')
        .setDescription('Fetch and display current seasonal anime with pagination'),
    new SlashCommandBuilder()
        .setName('upcoming')
        .setDescription('Fetch the upcoming seasonal anime!'),
    new SlashCommandBuilder()
        .setName('user')
        .setDescription('Shows the profile of a user on MyAnimeList')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('The username of the MyAnimeList user')
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays all available commands'),

];

const { REST, Routes } = require('discord.js');
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), // This registers commands only for one guild
            { body: commands.map(command => command.toJSON()) }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
