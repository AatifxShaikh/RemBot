const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const { getAnimeId } = require('../getAnimeId');

async function getAnimeSlash(animeName) {
    const animeId = await getAnimeId(animeName); // Fetch anime ID
    if (!animeId) throw new Error('Anime ID not found for the given name.');

    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/full`);
        const animeContent = response.data.data;

        const animeTitle = animeContent.title || "Unknown Title";
        const animeEnglishTitle = animeContent.title_english || "No English Title";
        const animeSynopsis = animeContent.synopsis || "No synopsis available";
        const animeGenres = animeContent.genres.map(genre => genre.name).join(", ");
        const animeRating = animeContent.rating || "No rating available";
        const animeScore = animeContent.score?.toString() || "No score available";
        const animeImage = animeContent.images?.jpg?.large_image_url || animeContent.images?.webp?.large_image_url || "https://via.placeholder.com/300x450?text=No+Image";
        const animeMembers = animeContent.members?.toString() || "No member count available";

        // Create the embed
        const animeEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(animeTitle)
            .setDescription(animeSynopsis.substring(0, 300) + '...')
            .addFields(
                { name: 'English Title', value: animeEnglishTitle, inline: true },
                { name: 'Genres', value: animeGenres, inline: true },
                { name: 'Rating', value: animeRating, inline: true },
                { name: 'Score', value: animeScore, inline: true },
                { name: 'Members', value: animeMembers, inline: true }
            )
            .setImage(animeImage)
            .setFooter({ text: 'Powered by Jikan API' });

        return { embeds: [animeEmbed] };
    } catch (error) {
        console.error("Error fetching anime details:", error);
        throw new Error('Error fetching anime details.');
    }
}

module.exports = { getAnimeSlash };
