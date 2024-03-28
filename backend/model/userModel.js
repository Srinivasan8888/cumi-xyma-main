import mongoose from "mongoose";
const {Schema} = mongoose;

const User = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true},        
        password: {                     
            type: String,
            required: true},
    },
    {collection: 'logins'}
)

export default mongoose.model('logins', User);