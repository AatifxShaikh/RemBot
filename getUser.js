const axios = require('axios');
const fs = require('fs');
const { EmbedBuilder } = require('discord.js');
const { saveDatabase } = require('./leaderBoard');
const dbPath = './database.json';
// Function to fetch and display user data
const loadDatabase = () => {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ users: {} }, null, 2));
    }
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
};
async function getUserProfile(message) {
    const username = message.content.split(" ")[1]; // Extract username from command

    if (!username) {
        return message.reply("Please provide a username. Usage: `!user <username>`");
    }

    try {
        // Fetch user profile from the Jikan API
        const response = await axios.get(`https://api.jikan.moe/v4/users/${username}/full`);
        const userData = response.data.data;

        const { mal_id, username: malUsername, statistics } = userData;
        const anime_watched = userData.statistics.anime;
        const animeWatched = anime_watched.completed;
        const database = loadDatabase();
        database.users[mal_id] = {
            username: malUsername,
            anime_watched: animeWatched,
        };
        saveDatabase(database);
        // Extract necessary details
        const userId = userData.mal_id || "Unknown";
        const userName = userData.username || "Unknown";
        const profileImage = userData.images?.jpg?.image_url || userData.images?.webp?.image_url || "https://via.placeholder.com/300x300?text=No+Image";
        const profileUrl = userData.url || "No URL Available";
        const animeStats = userData.statistics.anime;
        const mangaStats = userData.statistics.manga;

        // Create the embed
        const userEmbed = new EmbedBuilder()
            .setColor('#7289da')
            .setTitle(`Profile of ${userName}`)
            .setThumbnail(profileImage)
            .setURL(profileUrl)
            .setDescription(`**MyAnimeList ID:** ${userId}`)
            .addFields(
                {
                    name: 'Anime Statistics', value: `
- **Days Watched:** ${animeStats.days_watched || 0}
- **Mean Score:** ${animeStats.mean_score || 0}
- **Watching:** ${animeStats.watching || 0}
- **Completed:** ${animeStats.completed || 0}
- **On Hold:** ${animeStats.on_hold || 0}
- **Dropped:** ${animeStats.dropped || 0}
- **Plan to Watch:** ${animeStats.plan_to_watch || 0}
- **Total Entries:** ${animeStats.total_entries || 0}
- **Episodes Watched:** ${animeStats.episodes_watched || 0}
                `, inline: false
                },
                {
                    name: 'Manga Statistics', value: `
- **Days Read:** ${mangaStats.days_read || 0}
- **Mean Score:** ${mangaStats.mean_score || 0}
- **Reading:** ${mangaStats.reading || 0}
- **Completed:** ${mangaStats.completed || 0}
- **On Hold:** ${mangaStats.on_hold || 0}
- **Dropped:** ${mangaStats.dropped || 0}
- **Plan to Read:** ${mangaStats.plan_to_read || 0}
- **Total Entries:** ${mangaStats.total_entries || 0}
- **Chapters Read:** ${mangaStats.chapters_read || 0}
- **Volumes Read:** ${mangaStats.volumes_read || 0}
                `, inline: false
                },
                {
                    name: 'Favorites', value: `
- **Anime:** ${userData.favorites.anime.length > 0 ? userData.favorites.anime.map(a => a.title).join(", ") : "None"}
- **Manga:** ${userData.favorites.manga.length > 0 ? userData.favorites.manga.map(m => m.title).join(", ") : "None"}
- **Characters:** ${userData.favorites.characters.length > 0 ? userData.favorites.characters.map(c => c.name).join(", ") : "None"}
- **People:** ${userData.favorites.people.length > 0 ? userData.favorites.people.map(p => p.name).join(", ") : "None"}
                `, inline: false
                }
            )
            .setFooter({ text: 'Powered by Jikan API' });

        // Send the embed
        message.reply({ embeds: [userEmbed] });

    } catch (error) {
        console.error("Error fetching user profile:", error);
        message.reply("Could not fetch user profile. Please ensure the username is correct.");
    }
}

module.exports = getUserProfile;
