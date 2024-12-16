// slashCommands/getTrailerSlash.js
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { getAnimeId } = require('../getAnimeId');


async function getTrailerSlash(animeName) {
    try {
        const animeId = await getAnimeId(animeName);
        if (!animeId) {
            return 'Could not find the anime. Please check the name and try again.'; // Return message instead of using interaction.reply
        }

        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/videos`);
        const animeContent = response.data.data;

        const trailer = animeContent.promo?.[0];
        if (!trailer) {
            return 'No trailer available for this anime.';
        }

        const trailerTitle = trailer.title || 'No Title';
        const trailerEmbedUrl = trailer.trailer?.embed_url || '';

        let videoUrl = '';
        if (trailerEmbedUrl) {
            const videoId = trailerEmbedUrl.split('/').pop().split('?')[0];
            videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        }

        if (videoUrl) {
            return `**Trailer for ${animeName}:** ${trailerTitle}\n${videoUrl}`;
        } else {
            return 'No trailer video URL available.';
        }
    } catch (error) {
        console.error(error);
        return 'There was an error fetching the trailer. Please try again later.'; // Return message instead of using interaction.reply
    }
}

module.exports = { getTrailerSlash };
