const fs = require('fs');
const { EmbedBuilder } = require('discord.js');

const dbPath = './database.json';

// Load database
const loadDatabase = () => {
    try {
        if (!fs.existsSync(dbPath)) {
            fs.writeFileSync(dbPath, JSON.stringify({ users: {} }, null, 2));
        }
        return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    } catch (error) {
        console.error("Error loading database:", error);
        return { users: {} };
    }
};

const saveDatabase = (data) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error saving database:", error);
    }
};

// Update anime watched count
async function updateAnimeWatched(userId, username, count = 1, action = 'increment') {
    const database = loadDatabase();

    if (!database.users[userId]) {
        database.users[userId] = { username, anime_watched: 0 };
    }

    switch (action) {
        case 'increment':
            database.users[userId].anime_watched += count;
            break;
        case 'decrement':
            database.users[userId].anime_watched = Math.max(0, database.users[userId].anime_watched - count);
            break;
        case 'set':
            database.users[userId].anime_watched = count;
            break;
        default:
            console.error("Invalid action for updateAnimeWatched:", action);
    }

    saveDatabase(database);
}

// Display leaderboard
async function displayLeaderboard(message) {
    const database = loadDatabase();
    const users = Object.entries(database.users)
        .map(([id, user]) => user)
        .sort((a, b) => b.anime_watched - a.anime_watched)
        .slice(0, 10); // Top 10

    if (users.length === 0) {
        return message.reply("No data available for the leaderboard.");
    }

    let prevAnimeWatched = null;
    let rank = 0;
    const rankedUsers = users.map((user, index) => {
        if (user.anime_watched !== prevAnimeWatched) {
            rank = index + 1;
            prevAnimeWatched = user.anime_watched;
        }
        return { ...user, rank };
    });

    const leaderboardEmbed = new EmbedBuilder()
        .setColor('#FFD700')
        .setTitle('Anime Leaderboard')
        .setDescription('Top users with the most anime watched')
        .addFields(
            rankedUsers.map(user => ({
                name: `${user.rank}. ${user.username}`,
                value: `Anime Watched: **${user.anime_watched}**`,
                inline: false,
            }))
        )
        .setFooter({ text: 'Keep watching anime to climb the leaderboard!' });

    message.channel.send({ embeds: [leaderboardEmbed] });
}

module.exports = { updateAnimeWatched, displayLeaderboard, saveDatabase };
