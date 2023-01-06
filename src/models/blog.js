import mongoose, { Schema } from "mongoose";
const { ObjectId } = mongoose.Types;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 16
    },
    thumbnail: {
        type: String
    },
    shortDescription: {
        type: String
    },
    content: {
        type: String,
        required: true,
        minLength: 32,
    },
    user: {
        type: ObjectId,
        ref: 'User'
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        index: true,
    },
    comments: [
        {
            type: ObjectId,
            ref: "Comment"
        }
    ]
}, { timestamps: true })

export default mongoose.model('Blog', blogSchema)