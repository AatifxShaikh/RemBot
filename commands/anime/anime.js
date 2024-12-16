// const { SlashCommandBuilder } = require('discord.js');
// const getAnimeSlash = require('../../slashCommands/getAnimeSlash'); // Import logic from your other files

// module.exports = {
//     data: new SlashCommandBuilder()
//         .setName('anime')
//         .setDescription('Get anime details')
//         .addStringOption(option =>
//             option.setName('name').setDescription('Name of the anime').setRequired(true)
//         ),
//     async execute(interaction) {
//         const animeName = interaction.options.getString('name');
//         await interaction.reply(`Fetching details for ${animeName}...`);

//         try {
//             const response = await getAnimeSlash(animeName);
//             await interaction.editReply(response);
//         } catch (error) {
//             console.error(error);
//             await interaction.editReply('Failed to fetch anime details. Please try again.');
//         }
//     },
// };
