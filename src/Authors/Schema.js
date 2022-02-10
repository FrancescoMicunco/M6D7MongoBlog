import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const author = new Schema({
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["User", "Admin"], default: "User" },
}, {
    timestamps: true,
});

author.pre("save", async function(next) {
    const newAuthor = this;
    const plainPW = newAuthor.password;

    if (newAuthor.isModified("password")) {
        const hash = await bcrypt.hash(plainPW, 10);
        newAuthor.password = hash;
    }
    next();
});

author.methods.toJSON = function() {
    const userDocument = this;
    const userObject = userDocument.toObject();
    delete userObject.password;
    delete userObject.__v;

    return userObject;
};

author.statics.checkCredentioals = async function(email, plainPW) {
    const author = await this.findOne({ email });
    if (author) {
        const isMatch = await bcrypt.compare(plainPW, author.password);
        if (isMatch) {
            return author;
        } else {
            return null;
        }
    } else {
        return null;
    }
};

export default model("Author", author);