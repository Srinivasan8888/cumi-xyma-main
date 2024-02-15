import mongoose from "mongoose";
const { Schema } = mongoose;

const limitSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    time: {
        type: String,
    },
    inputthickness: {
        type: String,
    },

},{timestamps: true}); 

export default mongoose.model('setlimit', limitSchema)