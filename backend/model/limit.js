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

limitSchema.pre("save", function (next) {
    const currentDate = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5.5
    const istDate = new Date(currentDate.getTime() + istOffset);
  
    this.createdAt = istDate; 
    this.updatedAt = istDate; 
  
    next();
  });

export default mongoose.model('setlimit', limitSchema)