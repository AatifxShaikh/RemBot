// In sendHelpEmbed.js
const { EmbedBuilder } = require("discord.js");

async function sendHelpEmbed(message) {
    const embed = new EmbedBuilder()
        .setColor("#00FF00")
        .setTitle("Available Commands")
        .setDescription("Here are all the commands you can use:")

    // Add message-based commands
    embed.addFields(
        { name: "!recommend", value: "Get anime recommendations." },
        { name: "!find <anime name>", value: "Find details about a specific anime." },
        { name: "!seasonal", value: "Get seasonal anime listings." },
        { name: "!upcoming", value: "Get upcoming anime releases." },
        { name: "!commands", value: "Display this help message." },
        { name: "!user", value: "View your profile information." },
        { name: "!leaderboard", value: "Display the leaderboard of most anime watched." },
        { name: "!trailer <anime name>", value: "Get the trailer of a specific anime." }
    );



    // Send the embed to the message
    message.reply({ embeds: [embed] });
}

module.exports = sendHelpEmbed;
