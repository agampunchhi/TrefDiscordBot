import { Client } from "discord.js";
import { Commands } from "../Commands";
import { connectDatabase } from "../database/connectDB";

export default (client: Client): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }
        await client.application.commands.set(Commands);
        await connectDatabase();
        console.log(`${client.user.username} is online`);
        console.log(`Current Guilds are: ${client.guilds.cache.map((guild) => guild.name)}`);
    });
};