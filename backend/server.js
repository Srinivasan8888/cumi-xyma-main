const express = require("express");
const mongoose = require('mongoose');
// const Level = require("../backend/model/level");
const Asset = require("../backend/model/asset");
// const apiRoute = require("./api/data");
mongoose.set('bufferCommands', false);

const cors = require('cors');
const app = express();
const connect = async () => {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/cumi');
        console.log('Mongodb Connected..');

        // Save the document after the connection is established
        // const levels = new Level({ id: "91SR01000001", level: 55, battery: 56, signal: 30, lat: 65.0987, lon: 69.5785, obt: 23 });
        // await levels.save();
        // console.log('level value updated');

        // Level.find({}).then((ans) => {
        //     console.log(ans);
        // });

        //Assets type oda 

        // const asset = new Asset({ id: "91SR01000003", tcylinder: "R410A(NonFlammable)", fcylinder: 84, ecylinder: 36, gasweigth: 48, status: "Inactive" });
        // await asset.save();
        // console.log('Asset value updated');

        // Asset.find({}).then((ans) => {
        //     console.log(ans);
        // });

    } catch (error) {
        console.error('Error:', error.message);
    }
};

app.use(express.json());
app.use(cors());

// app.get("/leveldata", async(req, res) =>{
//     try{
//         Level.find({}).then((ans) => {
//             res.json(ans);
//         })
//     }
//     catch(error){
//         console.error('Error:', error.message);
//     }
// })

// app.get("/assetdata", async(req, res) =>{
//     try{
//         Asset.find({}).then((ans) => {
//             res.json(ans);
//         })
//     }
//     catch(error){
//         console.error('Error:', error.message);
//     }
// })

app.listen(4000, async () => {
    console.log('Server Started on port 4000..');
    await connect();  // Connect to MongoDB after the server starts
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongodb disconnected...');
});