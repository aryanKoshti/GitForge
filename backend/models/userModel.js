const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    repositories: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "Repository",
        },
    ],

    followersUsers: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    starRepo: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "Repository",
        },
    ],

},
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;