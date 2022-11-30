import Users from "../models/Users";

async function addUser(userID: string, username: string, guildName: string) {
    let userExists = await Users.findOne({ userID: userID, guildName: guildName });
    if (!userExists) {
    const userData = await Users.create({
        userID: userID,
        username: username,
        guildName: guildName,
    });
    await userData.save();
    }
}

export default addUser;