import mongoose from "mongoose";

const { Schema } = mongoose;

const idSchema = new mongoose.Schema({
    id: {
      type: String,
    }
  });
  
  

export default mongoose.model('idModel', idSchema);
