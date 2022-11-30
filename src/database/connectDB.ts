import { connect } from "mongoose";

const dbURL = process.env.MONGO_URI as string;


export const connectDatabase = async () => {
    await connect(dbURL);
    console.log("Database Connected!")
}