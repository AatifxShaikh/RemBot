# Rem Bot

A Discord bot built with the Discord.js library that interacts with the MyAnimeList API via Jikan, providing various anime-related functionalities. The bot allows users to discover seasonal anime, search for anime, get personalized recommendations, view user profiles, and more!

---

## Features

### General Interaction
- **Greeting Commands**: Replies with a friendly message and GIF when users say "hi" or "hey".
- **Humorous Reactions**: Reacts with a GIF for specific phrases like "why", or "who".
- **Fun Fact**: Use `!funfact` or `/funfact` to get a random anime-related fun fact.

### Anime Commands
- **Find Anime**: Use `!find <anime_name>` or `/find <anime_name>` to search for an anime by title.
- **Seasonal Anime**: Use `!seasonal` or `/seasonal` to view a list of currently airing anime, with pagination.
- **Upcoming Anime**: Use `!upcoming` or `/upcoming` to see upcoming anime titles.
- **Recommendations**: Use `!recommend <anime_name>` or `/recommend <anime_name>` to get anime recommendations based on a title.
- **User Profiles**: Use `!user <username>` or `/user <username>` to fetch MyAnimeList user profile details, including statistics and favorites.

### New Features
- **Anime Trailer**: Use `!trailer <anime_name>` or `/trailer <anime_name>` to get the official trailer for a specific anime.
- **Leaderboard**: Use `!leaderboard` or `/leaderboard` to display the leaderboard based on the number of anime watched by users in the server.
- **Ping**: Use `!ping` or `/ping` to check if the bot is responsive.

### Help Command
- **Help Embed**: Use `!help` or `/help` to display all available commands and their usage.

---

## Installation

### Prerequisites
1. [Node.js](https://nodejs.org/) (v16 or later).
2. [Discord Bot Token](https://discord.com/developers/applications).

### Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project folder:
   ```bash
   cd anime-bot
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the project root and add your bot token:
   ```env
   DISCORD_TOKEN=your_bot_token
   ```
5. Run the bot:
   ```bash
   node index.js
   ```

---

## Usage

Invite the bot to your Discord server using your bot's OAuth2 link and use the commands listed below.

### Commands

| Command             | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `!find <name>`      | Search for an anime by name.                          |
| `!seasonal`         | Get currently airing seasonal anime.                  |
| `!upcoming`         | Get upcoming anime.                                   |
| `!recommend <name>` | Get recommendations for an anime.                     |
| `!user <username>`  | View a MyAnimeList user profile.                      |
| `!leaderboard`      | Display leaderboard based on stats                    |
| `!help`             | Display all available commands.                       |
| `/find <name>`      | Slash command for searching anime.                    |
| `/seasonal`         | Slash command for seasonal anime.                     |
| `/upcoming`         | Slash command for upcoming anime.                     |
| `/recommend <name>` | Slash command for anime recommendations.              |
| `/user <username>`  | Slash command for MyAnimeList user profile.           |
| `/leaderboard`      | Slash command for leaderboard.                        |
| `/ping`             | Slash command to check bot status.                    |
| `/hello`            | Slash command to get a hello message from the bot.    |
| `/funfact`          | Slash command to get a random anime-related fun fact. |
| `/trailer <name>`   | Slash command to get the anime trailer.               |

---

## To-Do Ideas for the Anime Bot

### Features to Add
1. **Manga Support**: 
   - Add commands to search for manga and fetch manga recommendations.

2. **Favorites Management**: 
   - Allow users to save their favorite anime locally.

3. **Trivia Games**: 
   - Introduce an anime trivia feature where users answer questions to earn points.


4. **Upcoming Episode Reminders**: 
   - Let users subscribe to reminders for upcoming episodes of their favorite anime.

5. **Genre Filters**: 
   - Add filters for searching anime by genre, rating, or popularity.


6. **Anime Watchlist**: 
   - Let users create and manage watchlists locally.



---

## Dependencies

| Package      | Description                             |
| ------------ | --------------------------------------- |
| `discord.js` | Discord API wrapper for Node.js.        |
| `axios`      | HTTP client for making API requests.    |
| `dotenv`     | Load environment variables from `.env`. |

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

---



## Credits

- [Jikan API](https://jikan.moe/) for providing anime data.
- [Discord.js](https://discord.js.org/) for powering the bot.

---

Happy Anime-ing! 🎉

