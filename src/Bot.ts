import { ChannelType, Client, ClientOptions, ActionRowBuilder, ButtonBuilder, ButtonStyle, GatewayIntentBits } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import addUser from "./database/services/addUser";

const token = process.env.TOKEN

console.log("Bot is starting...");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
      ],
});

ready(client);
interactionCreate(client);

client.login(token);

async function messageSender(data: Array<string>, postRequest: boolean) {
    console.log("Message Sender is running...");
    console.log(data)
    const server = data[0];
    let channel = undefined;
    if (!postRequest) { //if method call is through Post Request then channel name is sent instead of channel ID
        channel = client.guilds.cache.get(server)?.channels.cache.get(data[1]) as any;
        const userID = data[5];
        const username = data[6];
        const guildName = data[7];
        await addUser(userID, username, guildName);
    } else {
        channel = client.guilds.cache.get(server)?.channels.cache.find(channel => channel.name === data[1]) as any;
    }
    if (channel && channel.type === ChannelType.GuildText) {
    const text = data[2];
    const url = data[3];
    const buttonText = data[4];
    //I have set the button to open the image URL
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder().setLabel(buttonText).setStyle(ButtonStyle.Link).setURL(url));
    await channel.send({
        content: text,
        components: [row],
        files: [url],
    });
    return true;
    }
    return false;
}

export default messageSender;