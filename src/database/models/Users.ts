import { Document, model, Schema } from "mongoose";

export interface Users {
    userID: string;
    username: string;
    guildName: string;
  }
  
  export const User = new Schema({
    userID: String,
    username: String,
    guildName: String,
  });
  
  export default model<Users>("user", User);
  