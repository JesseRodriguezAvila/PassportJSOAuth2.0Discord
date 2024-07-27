import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    discordId: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const User = mongoose.model(`users`, userSchema);

export default User;