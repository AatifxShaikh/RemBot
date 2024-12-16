const axios = require('axios');
const { EmbedBuilder } = require('discord.js');
const { getAnimeId } = require('./getAnimeId');  // You are using this function to get anime ID

async function getTrailer(message) {
    const animeName = message.content.split(" ").slice(1).join(" ");

    // Fetch the animeId using the getAnimeId function
    const animeId = await getAnimeId(animeName);
    if (!animeId) {
        return message.reply("Could not find the anime. Please check the name and try again.");
    }

    try {
        // Fetch anime trailer data from the Jikan API
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${animeId}/videos`);
        const animeContent = response.data.data;

        // Get the first trailer from the promo array
        const trailer = animeContent.promo?.[0]; // Access the first trailer

        if (!trailer) {
            return message.reply("No trailer available for this anime.");
        }

        const trailerTitle = trailer.title || "No Title";
        const trailerEmbedUrl = trailer.trailer?.embed_url || "";

        // Correct handling of the embed_url to extract the video ID for YouTube
        let videoUrl = "";
        if (trailerEmbedUrl) {
            const videoId = trailerEmbedUrl.split('/').pop().split('?')[0]; // Extract video ID
            videoUrl = `https://www.youtube.com/watch?v=${videoId}`; // Format the URL to be played in Discord
        }

        // If we have the YouTube link, send it to Discord (Discord will auto-embed the video)
        if (videoUrl) {
            message.reply(videoUrl); // This will generate a clickable, embedded YouTube video
        } else {
            message.reply("No trailer video URL available.");
        }

    } catch (error) {
        console.error(error);
        message.reply("There was an error fetching the trailer. Please try again later.");
    }
}

module.exports = { getTrailer };
