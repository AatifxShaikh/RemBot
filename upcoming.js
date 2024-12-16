const axios = require('axios');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

async function getUpcomingSeason(message) {
    try {
        const response = await axios.get('https://api.jikan.moe/v4/seasons/upcoming');
        const animeData = response.data.data;

        let currentPage = 0; // Initial page

        // Helper function to create an embed for a specific set of anime
        function createEmbed(page) {
            const animeSlice = animeData.slice(page * 4, (page + 1) * 4); // Show 4 anime per page
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Upcoming Seasonal Anime')
                .setDescription(`Page ${page + 1}`); // Page number in description

            animeSlice.forEach((anime, index) => {
                const episodes = anime.episodes ? anime.episodes.toString() : 'N/A';
                const score = anime.score ? anime.score.toString() : 'N/A';
                const members = anime.members || "No member count available";
                const rating = anime.rating ? anime.rating : 'N/A';
                const status = anime.status ? anime.status : 'Unknown';
                const airingDate = anime.aired ? anime.aired.prop.from : { day: "Unknown", month: "Unknown", year: "Unknown" };
                const airingDateString = `${airingDate.day}-${airingDate.month}-${airingDate.year}`;

                // Use only thumbnail image (jpg) and provide a fallback if missing
                const thumbnail = anime.images?.jpg?.small_image_url || 'https://via.placeholder.com/300x450?text=No+Image';

                // Add serial number, title, and fields for each anime
                embed.addFields(
                    { name: `${index + 1}. ${anime.title}`, value: anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : 'No description available', inline: false },
                    { name: 'Airing Date', value: airingDateString, inline: true },
                    { name: 'Status', value: status, inline: true },
                    { name: 'Rating', value: rating, inline: true },
                    { name: 'Members', value: members.toString(), inline: true }
                );
                embed.setThumbnail(thumbnail);
                if (index < animeSlice.length - 1) {
                    embed.addFields({ name: '\u200b', value: '\u200b', inline: false }); // Empty field for a little space
                }
            });

            return embed;
        }

        // Create action row with navigation buttons
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('previous')
                    .setLabel('Previous')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(currentPage === 0),
                new ButtonBuilder()
                    .setCustomId('next')
                    .setLabel('Next')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(currentPage >= Math.floor(animeData.length / 4)) // Adjusted for 4 items per page
            );

        // Send the initial embed
        const embedMessage = await message.channel.send({
            embeds: [createEmbed(currentPage)],
            components: [row],
        });

        // Button interaction handler
        const filter = (interaction) => interaction.user.id === message.author.id;
        const collector = embedMessage.createMessageComponentCollector({ filter, time: 60000 }); // 1 minute timeout

        collector.on('collect', async (interaction) => {
            if (interaction.customId === 'next') {
                currentPage++;
            } else if (interaction.customId === 'previous') {
                currentPage--;
            }

            // Update the embed and the buttons
            const newEmbed = createEmbed(currentPage);
            const newRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('previous')
                        .setLabel('Previous')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(currentPage === 0),
                    new ButtonBuilder()
                        .setCustomId('next')
                        .setLabel('Next')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(currentPage >= Math.floor(animeData.length / 4)) // Adjusted for 4 items per page
                );

            await interaction.update({
                embeds: [newEmbed],
                components: [newRow],
            });
        });

        collector.on('end', () => {
            // Disable the buttons after the time limit
            embedMessage.edit({
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId('previous').setLabel('Previous').setStyle(ButtonStyle.Primary).setDisabled(true),
                        new ButtonBuilder().setCustomId('next').setLabel('Next').setStyle(ButtonStyle.Primary).setDisabled(true)
                    ),
                ],
            });
        });

    } catch (error) {
        console.error('Error fetching upcoming seasonal anime:', error);
        message.channel.send('Sorry, there was an error fetching the anime data.');
    }
}

module.exports = getUpcomingSeason;
