import mongoose from "mongoose";
import asset from "../model/asset.js";
import idModel from "../model/idmodel.js";

export const createSensor = async (req, res) => {
  const { id, thickness, devicetemp, signal, batterylevel, time } = req.query;

  try {
    const sensor = new asset({
      id: String(id),
      thickness: String(thickness),
      devicetemp: String(devicetemp),
      signal: String(signal),
      batterylevel: String(batterylevel),
      time: String(time),
    });

    const savesensor = await sensor.save();
    res.status(200).json(savesensor);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getlogdata = async (req, res) => {
  try {
    const logdata = await asset.find().sort({ updatedAt: -1 }).limit(40);
    res.status(200).json(logdata);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSensorData = async (req, res) => {
  const sensorId = req.params.id;

  try {
    const sensorData = await idModel.findOne({ id: sensorId });

    if (!sensorData) {
      return res
        .status(404)
        .json({ error: `No data found for sensor ${sensorId}` });
    }

    const deviceid = sensorData.id;

    const events = await asset.find({ id: deviceid }).limit(1);

    res.status(200).json(events);
  } catch (error) {
    console.error(`Error fetching data for sensor ${sensorId}:`, error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
//   try {
//     // Create a new document with the given id
//     const getdata = new idmodel({
//       xyid: String(id),
//     });

//     // Save the document to the database
//     const iddata = await getdata.save();
//     const xymaid = iddata.xyid;

//     // Find the document in the idmodel collection where id equals xymaid
//     const event = await idmodel.findOne({ xyid: xymaid });

//     if (event) {
//       // Concatenate extra characters to the "id" field value
//       const modifiedId = event.xyid ? `${event.xyid}` : null;

//       console.log('Modified id:', modifiedId);

//       // Send the modified response
//       res.status(200).json({ success: true, data: { ...event._doc, id: modifiedId } });
//     } else {
//       console.log('No matching document found');
//       res.status(404).json({ success: false, error: 'No matching document found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, error: 'Internal Server Error' });
//   }
// };

export const iddata = async (req, res) => {
  const { id, batter, thickness } = req.params;
  console.log("Received id:", id);

  try {
    const sensorData = await idModel({
      id: String(id),
    });

    const dataid = await sensorData.save();
    const deviceid = dataid.id;

    const assetDocument = await mongoose.model("asset").findOne({
      id: deviceid,
    });

    if (!assetDocument) {
      res.status(404).json({ error: "Asset not found" });
      return;
    }

    res.json(assetDocument);
  } catch (error) {
    res.status(500).json(error);
  }
};
