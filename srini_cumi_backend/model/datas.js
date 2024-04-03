import mongoose from "mongoose";
const { Schema } = mongoose;

const datasSchema = new mongoose.Schema({
    device_name: {
        type: String,
    },
    thickness: {
        type: String,
    },
    device_status: {
        type: String,
    },
    signal_strength: {
        type: String,
    },
    battery_status: {
        type: String,
    },
    timestamp: {
        type: String, 
    }
}); 

export default mongoose.model("data", datasSchema)