import mongoose from "mongoose";
const { Schema } = mongoose;

const assetSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    thickness: {
        type: String,
    },
    devicetemp: {
        type: String,
    },
    signal: {
        type: String,
    },
    batterylevel: {
        type: String,
    }
},{timestamps: true}); 


export default mongoose.model('asset', assetSchema)