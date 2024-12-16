const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const { getAnimeId } = require('./getAnimeId');

async function getRecommenations(message) {
    const animeName = message.content.split(" ").slice(1).join(" ");
    const animeId = await getAnimeId(animeName);
    console.log(animeId);

    try {
        // Make a request to the Jikan API to get recommendations for the anime
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/recommendations`);
        const recommendations = response.data.data;

        if (recommendations.length === 0) {
            return message.reply("Sorry, no recommendations found for this anime.");
        }

        // Create the embed for recommendations
        const recommendationsEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Anime Recommendations')
            .setDescription(`Here are some recommendations based on the anime "${animeName}":`);

        // Add fields for up to 5 recommendations
        recommendations.slice(0, 5).forEach((anime) => {
            const animeTitle = anime.entry.title || "Unknown Title";
            const animeUrl = anime.url || 'No URL Available';
            const animeImage = anime.entry.images?.jpg || anime.entry.images?.webp;
            const imageUrl = animeImage?.image_url;
            const imageSize = animeImage?.large_image_url || animeImage?.small_image_url || imageUrl;
            const recommendationVotes = anime.votes || "0";

            recommendationsEmbed.addFields(
                { name: animeTitle, value: `[Click here for more](${animeUrl})`, inline: false },
                { name: 'Votes', value: recommendationVotes.toString(), inline: true }
            );

            // Set the image directly in the embed
            recommendationsEmbed.setImage(imageSize);
        });

        // Send the embed as a reply
        message.reply({ embeds: [recommendationsEmbed] });

    } catch (error) {
        console.error('Error fetching recommendations:', error);
        message.reply("There was an error fetching anime recommendations.");
    }
}

module.exports = { getRecommenations };
