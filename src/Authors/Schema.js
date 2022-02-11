import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

const authorSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    avatar: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["User", "Admin"], default: "User" },
    googleId: { type: String }

}, {
    timestamps: true,
});

authorSchema.pre("save", async function(next) {
    const newAuthor = this;
    const plainPW = newAuthor.password;

    if (newAuthor.isModified("password")) {
        const hash = await bcrypt.hash(plainPW, 10);
        newAuthor.password = hash;
    }
    next();
});

authorSchema.methods.toJSON = function() {
    const authorDocument = this;
    const authorObject = authorDocument.toObject();
    delete authorObject.password;
    delete authorObject.__v;

    return authorObject;
};

authorSchema.statics.checkCredentials = async function(email, plainPW) {
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

export default model("Author", authorSchema);