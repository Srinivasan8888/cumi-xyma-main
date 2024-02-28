import mongoose from "mongoose";
import asset from "../model/asset.js";
import idModel from "../model/idModel.js";
import limit from "../model/limit.js";

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

export const timelimit = async (req, res) => {
  const { id, time, inputthickness } = req.query;

  try {
    const tlimit = new limit({
      id: String(id),
      time: String(time),
      inputthickness: String(inputthickness),
    });

    const savelimit = await tlimit.save();
    res.status(200).json(savelimit);
  } catch (error) {
    res.status(500).json(error);
  }
};

// export const getlogdata = async (req, res) => {
//   try {
//     // Step 1: Retrieve data sorted by updatedAt
//     const logData = await asset.find().sort({ updatedAt: 1 }).limit(40);

//     // Step 2: Manipulate data to update id based on timestamp
//     const updatedLogData = logData.map((item, index) => ({
//       ...item.toObject(),
//       id: `xy${(index + 1).toString().padStart(3, '0')}` // Assuming index starts from 0
//     }));

//     res.status(200).json(updatedLogData);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };


export const getlogdata = async (req, res) => {
  try {
    const logdata = await asset.aggregate([
      { $sort: { id: 1, updatedAt: -1 } },
      { $group: { _id: "$id", data: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$data" } },
      { $addFields: { idNumber: { $toInt: { $substr: ["$id", 2, -1] } } } },
      { $sort: { idNumber: 1 } }, 
      { $project: { idNumber: 0 } },
      { $limit: 40 } 
    ]);

    if (!logdata || logdata.length === 0) {
      return res.status(404).json({ error: "No assets found" });
    }

    res.json(logdata);
  } catch (error) {
    res.status(500).json(error);
  }
};

// export const getlogdata = async (req, res) => {
//   try {
//     const logdata = await asset.aggregate([
//       { $sort: { updatedAt: -1 } }, // Sort documents by updatedAt in descending order
//       { $group: { _id: "$id", data: { $first: "$$ROOT" } } }, // Group by id and take the first document (latest)
//       { $replaceRoot: { newRoot: "$data" } }, // Replace the root with the grouped document
//       { $limit: 40 } // Limit the result to 40 documents
//     ]);

//     if (!logdata || logdata.length === 0) {
//       return res.status(404).json({ error: "No assets found" });
//     }

//     res.json(logdata);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };



// export const getlogdata1 = async (req, res) => {
//   try {
//     const logdata = await Asset.aggregate([
//       { $sort: { updatedAt: -1 } },
//       { $group: { _id: "$id", data: { $first: "$$ROOT" } } },
//       { $replaceRoot: { newRoot: "$data" } },
//       { $addFields: { idNumber: { $toInt: { $substr: ["$id", 2, -1] } } } },
//       { $sort: { idNumber: 1 } }, 
//       { $project: { idNumber: 0 } },
//       { $limit: 40 } 
//     ]);

//     res.status(200).json(logdata);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };


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

export const iddata = async (req, res) => {
  const { id } = req.params;
  console.log("Received id:", id);

  try {
    const sensorData = await idModel({
      id: String(id),
    });

    const dataid = await sensorData.save();
    const deviceid = dataid.id;

    const assetDocumentArray = await mongoose
      .model("asset")
      .find({
        id: deviceid,
      })
      .sort({ createdAt: -1 })
      .limit(30);

    if (!assetDocumentArray || assetDocumentArray.length === 0) {
      res.status(404).json({ error: "Asset not found" });
      return;
    }

    const response = assetDocumentArray.map((assetDocument) => {
      const responseData = {
        createdAt: assetDocument.createdAt,
        devicetemp: assetDocument.devicetemp,
        id: assetDocument.id,
        signal: assetDocument.signal,
        updatedAt: assetDocument.updatedAt,
        __v: assetDocument.__v,
        _id: assetDocument._id,
      };

      if (req.query.battery === "true") {
        responseData.batterylevel = assetDocument.batterylevel;
      }

      if (req.query.thickness === "true") {
        responseData.thickness = assetDocument.thickness;
      }

      return responseData;
    });

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const tabledatas = async (req, res) => {
  const { id } = req.params;
  console.log("Received id:", id);

  try {
    const sensorData = await idModel({
      id: String(id),
    });

    const dataid = await sensorData.save();
    const deviceid = dataid.id;

    const assetDocumentArray = await mongoose
      .model("asset")
      .find({
        id: deviceid,
      })
      .sort({ createdAt: -1 })
      .limit(30);

    if (!assetDocumentArray || assetDocumentArray.length === 0) {
      res.status(404).json({ error: "Asset not found" });
      return;
    }

    const response = assetDocumentArray.map((assetDocument) => {
      const responseData = {
        id: assetDocument.id,
        createdAt: assetDocument.createdAt,
        thickness: assetDocument.thickness,
        batterylevel: assetDocument.batterylevel,
        devicetemp: assetDocument.devicetemp,
        signal: assetDocument.signal,
        updatedAt: assetDocument.updatedAt,
        __v: assetDocument.__v,
        _id: assetDocument._id,
      };
      return responseData;
    });

    res.json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getdatalimit = async (req, res) => {
  try {
    // Fetch all documents in the collection
    const assetLimitArray = await mongoose
      .model("limit")
      .find()
      .sort({ createdAt: -1 });

    if (!assetLimitArray || assetLimitArray.length === 0) {
      res.status(404).json({ error: "No assets found" });
      return;
    }

    const response = assetLimitArray.map((assetDocument) => {
      const responseData = {
        id: assetDocument.id,
        time: assetDocument.time,
        inputthickness: assetDocument.inputthickness,
        updatedAt: assetDocument.updatedAt,
        __v: assetDocument.__v,
        _id: assetDocument._id,
      };
      return responseData;
    });

    res.json(response);
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json(error);
  }
};

export const getsetlimits = async (req, res) => {
  const { id } = req.params;
  console.log("Received id:", id);

  try {
    const sensorData = await limit.findOne({ id: id });

    if (!sensorData) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.json(sensorData);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const idallsetlimit = async (req, res) => {
  const { id } = req.params;
  console.log("Received id for limit:", id);

  try {
    const sensorData = await limit.findOne({ id: id }).sort({ updatedAt: -1 });

    if (!sensorData) {
      return res.status(404).json({ error: "No assets found" });
    }

    res.json(sensorData);
  } catch (error) {
    res.status(500).json(error);
  }
};



// export const allsetlimit = async (req, res) => {
//   try {
//     const sensorData = await limit.aggregate([
//       { $sort: { updatedAt: -1, id: 1 } },
//       { $limit: 40 }
//     ]);

//     if (!sensorData || sensorData.length === 0) {
//       return res.status(404).json({ error: "No assets found" });
//     }

//     res.json(sensorData);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// export const allsetlimit = async (req, res) => {
//   try {
//     const sensorData = await limit.aggregate([
//       { $sort: {  updatedAt: 1, } },
//       { $limit: 40 }
//     ]);

//     if (!sensorData || sensorData.length === 0) {
//       return res.status(404).json({ error: "No assets found" });
//     }

//     res.json(sensorData);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };


export const allsetlimit = async (req, res) => {
  try {
    const sensorData = await limit.aggregate([
      { $sort: { id: 1, updatedAt: -1 } },
      { $group: { _id: "$id", data: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$data" } },
      { $addFields: { idNumber: { $toInt: { $substr: ["$id", 2, -1] } } } },
      { $sort: { idNumber: 1 } }, 
      { $project: { idNumber: 0 } },
      { $limit: 40 } 
    ]);

    if (!sensorData || sensorData.length === 0) {
      return res.status(404).json({ error: "No assets found" });
    }

    res.json(sensorData);
  } catch (error) {
    res.status(500).json(error);
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

// export const iddata = async (req, res) => {
//   const { id } = req.query;
//   const { battery, thickness } = req.query;
//   console.log("Received id:", id);

//   try {
//     const sensorData = await idModel({
//       id: String(id),
//     });

//     const dataid = await sensorData.save();
//     const deviceid = dataid.id;

//     const assetDocument = await mongoose.model("asset").findOne({
//       id: deviceid,
//     });

//     if (!assetDocument) {
//       res.status(404).json({ error: "Asset not found" });
//       return;
//     }

//     res.json(assetDocument);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// export const iddata = async (req, res) => {
//   const { id } = req.params;
//   console.log("Received id:", id);

//   try {
//     const sensorData = await idModel({
//       id: String(id),
//     });

//     const dataid = await sensorData.save();
//     const deviceid = dataid.id;

//     const assetDocument = await mongoose.model("asset").findOne({
//       id: deviceid,
//     });

//     if (!assetDocument) {
//       res.status(404).json({ error: "Asset not found" });
//       return;
//     }

//     const response = {
//       createdAt: assetDocument.createdAt,
//       devicetemp: assetDocument.devicetemp,
//       id: assetDocument.id,
//       signal: assetDocument.signal,
//       updatedAt: assetDocument.updatedAt,
//       __v: assetDocument.__v,
//       _id: assetDocument._id
//     };

//     if (req.query.battery === 'true') {
//       response.batterylevel = assetDocument.batterylevel;
//     }

//     if (req.query.thickness === 'true') {
//       response.thickness = assetDocument.thickness;
//     }

//     res.json(response);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
