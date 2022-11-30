import { CommandInteraction, Client, ApplicationCommandType, ApplicationCommandOptionType, ChannelType } from "discord.js";
import { Command } from "../Command";
import messageSender from "../Bot";

export const SendMessage: Command = {
    name: "send_message",
    description: "Sends message to channel",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'channel',
            description: 'Channel to send message to',
            required: true,
            type: ApplicationCommandOptionType.Channel,
        },
        {
            name: 'text',
            description: 'Message text',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'url',
            description: 'Image URL',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: 'button_text',
            description: 'Text for call to action button',
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const server = interaction.guild?.id as string;
        const serverName = interaction.guild?.name as string
        const channel = interaction.options.data[0].channel?.id as string;
        const text = interaction.options.data[1].value as string;
        const url = interaction.options.data[2].value as string;
        const buttonText = interaction.options.data[3].value as string;
        const user = interaction.user;
        const data = [server, channel, text, url, buttonText, user.id, user.username, serverName];
        await messageSender(data, false);
        await interaction.followUp({
            ephemeral: true,
            content: 'Message sent',
        });
},
}
