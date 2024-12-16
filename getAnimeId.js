const axios = require('axios')
async function getAnimeId(animeName) {
    try {
        // Fetch anime ID using the anime name
        const searchResponse = await axios.get(`https://api.jikan.moe/v4/anime`, {
            params: {
                q: animeName,
                limit: 1,  // We only need the first result for now
            }
        });
        const anime = searchResponse.data.data[0];  // Get the first result
        if (!anime) {
            throw new Error("Anime not found")
        }
        return anime.mal_id;
    } catch (error) {
        console.error('Error fetching anime recommendations:', error);
        return null
    }
}
module.exports = { getAnimeId }