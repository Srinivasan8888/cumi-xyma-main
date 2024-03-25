import mongoose from "mongoose";
const { Schema } = mongoose;

const datasSchema = new mongoose.Schema({
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

// datasSchema.pre("save", function (next) {
//     const currentDate = new Date();
//     const istOffset = 5.5 * 60 * 60 * 1000; 
//     const istDate = new Date(currentDate.getTime() + istOffset);
  
    
//     this.createdAt = istDate.toISOString().replace('T', ' ').split('.')[0];
//     this.updatedAt = istDate.toISOString().replace('T', ' ').split('.')[0];
  
//     next();
// });

// datasSchema.virtual('createdAtFormatted').get(function() {
//     return this.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
// });

// datasSchema.virtual('updatedAtFormatted').get(function() {
//     return this.updatedAt.toLocaleString('en-US', { timeZone: 'Asia/Kolkata', hour12: false });
// });


export default mongoose.model('datas', datasSchema)