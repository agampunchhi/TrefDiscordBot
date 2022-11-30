import Users from "../models/Users";

async function getAllUsers() {
    let userArray: { username: string; serverName: string; }[] = [];
    const users = await Users.find(); 
    users.forEach((user: any) => {
        userArray.push({
            username: user.username,
            serverName: user.guildName,
        });
    });
    return userArray;
}

export default getAllUsers;