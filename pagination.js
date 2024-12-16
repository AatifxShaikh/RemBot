const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = async (message, pages, time = 30 * 1000) => {
    try {
        if (!message || !pages || pages.length === 0) throw new Error('[Pagination] Invalid args');

        // Initial reply with "Fetching..." or a placeholder message
        await message.reply("Fetching seasonal anime... Please wait.");

        if (pages.length === 1) {
            return await message.edit({ embeds: pages, components: [], fetchReply: true });
        }

        var index = 0;

        // Creating pagination buttons
        const first = new ButtonBuilder()
            .setCustomId('pagefirst')
            .setEmoji('◀️')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true);

        const prev = new ButtonBuilder()
            .setCustomId('pageprev')
            .setEmoji('⬅️')
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true);

        const pageCount = new ButtonBuilder()
            .setCustomId('pagecount')
            .setLabel(`${index + 1}/${pages.length}`)
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true);

        const next = new ButtonBuilder()
            .setCustomId('pagenext')
            .setEmoji('➡️')
            .setStyle(ButtonStyle.Primary);

        const last = new ButtonBuilder()
            .setCustomId('pagelast')
            .setEmoji('⏩')
            .setStyle(ButtonStyle.Primary);

        // Organizing buttons in a row
        const buttons = new ActionRowBuilder().addComponents([first, prev, pageCount, next, last]);

        // Send the initial message with pagination buttons
        const msg = await message.reply({ embeds: [pages[index]], components: [buttons], fetchReply: true });

        // Collect button clicks
        const collector = msg.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time
        });

        collector.on('collect', async (i) => {
            if (i.user.id !== message.author.id) {
                return await i.reply({ content: `Only **${message.author.username}** can use these buttons!`, ephemeral: true });
            }

            await i.deferUpdate();

            // Handling button clicks
            if (i.customId === 'pagefirst') {
                index = 0;
                pageCount.setLabel(`${index + 1}/${pages.length}`);
            }

            if (i.customId === 'pageprev') {
                if (index > 0) index--;
                pageCount.setLabel(`${index + 1}/${pages.length}`);
            } else if (i.customId === 'pagenext') {
                if (index < pages.length - 1) {
                    index++;
                    pageCount.setLabel(`${index + 1}/${pages.length}`);
                }
            } else if (i.customId === 'pagelast') {
                index = pages.length - 1;
                pageCount.setLabel(`${index + 1}/${pages.length}`);
            }

            // Disable buttons based on current page
            if (index === 0) {
                first.setDisabled(true);
                prev.setDisabled(true);
            } else {
                first.setDisabled(false);
                prev.setDisabled(false);
            }

            if (index === pages.length - 1) {
                next.setDisabled(true);
                last.setDisabled(true);
            } else {
                next.setDisabled(false);
                last.setDisabled(false);
            }

            // Update the message with the new page
            await msg.edit({ embeds: [pages[index]], components: [buttons] }).catch(err => { });

            // Reset the collector's timer
            collector.resetTimer();
        });

        collector.on('end', async () => {
            // Final edit with no buttons after timeout
            await msg.edit({ embeds: [pages[index]], components: [] }).catch(error => { });
        });

        return msg;
    } catch (e) {
        console.error(`[ERROR] ${e}`);
    }
};
