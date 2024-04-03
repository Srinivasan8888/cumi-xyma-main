import mongoose from "mongoose";

const { Schema } = mongoose;

const idSchema = new mongoose.Schema({
    device_name: {
      type: String,
    }
  });
  
  

export default mongoose.model('idModel', idSchema);
