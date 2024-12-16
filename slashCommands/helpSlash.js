// In your slash command handler (e.g., in `slashCommands/helpSlash.js`):

const { EmbedBuilder } = require("discord.js");

module.exports = {


    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor("#00FF00")
            .setTitle("Available Commands")
            .setDescription("Here are all the commands you can use:")

        // Add message-based commands


        // Add slash commands
        embed.addFields(
            { name: "/anime <name>", value: "Get details for a specific anime." },
            { name: "/recommend <name>", value: "Get anime recommendations based on a name." },
            { name: "/trailer <name>", value: "Get the trailer for a specific anime." },
            { name: "/seasonal", value: "Get seasonal anime listings." },
            { name: "/upcoming", value: "Get upcoming anime releases." },
            { name: "/user", value: "View your user profile." },
            { name: "!leaderboard", value: "Display the leaderboard of most anime watched." },

        );

        await interaction.reply({ embeds: [embed] });
    },
};
