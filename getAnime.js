const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const { getAnimeId } = require('./getAnimeId');

async function getAnime(message) {
    const animeName = message.content.split(" ").slice(1).join(" ");
    const animeId = await getAnimeId(animeName);
    console.log(animeId);

    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/full`);
        const animeContent = response.data.data;

        const animeTitle = animeContent.title || "Unknown Title";
        const animeEnglishTitle = animeContent.title_english || "No English Title";
        const animeSynopsis = animeContent.synopsis || "No synopsis available";
        const animeGenres = animeContent.genres.map(genre => genre.name).join(", ");
        const animeRating = animeContent.rating ? animeContent.rating.toString() : "No rating available";  // Ensure it's a string
        const animeScore = animeContent.score ? animeContent.score.toString() : "No score available";  // Ensure it's a string
        const animeImage = animeContent.images?.jpg?.large_image_url || animeContent.images?.webp?.large_image_url || "https://via.placeholder.com/300x450?text=No+Image";
        const animeMembers = animeContent.members ? animeContent.members.toString() : "No member count available";  // Ensure it's a string

        // Create the embed with anime details
        const animeEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(animeTitle)
            .setDescription(animeSynopsis.length > 0 ? animeSynopsis.substring(0, 300) + '...' : 'No description available')
            .addFields(
                { name: 'English Title', value: animeEnglishTitle, inline: true },
                { name: 'Genres', value: animeGenres, inline: true },
                { name: 'Rating', value: animeRating, inline: true },  // Now a string
                { name: 'Score', value: animeScore, inline: true },  // Now a string
                { name: 'Members', value: animeMembers, inline: true }  // Now a string
            )
            .setImage(animeImage)
            .setFooter({ text: 'Powered by Jikan API' });

        // Send the embed to the channel
        message.reply({ embeds: [animeEmbed] });

    } catch (error) {
        console.log(error);
        message.reply("There was an error fetching the anime details.");
    }
}

module.exports = { getAnime };
