import mongoose from "mongoose";
import asset from "../model/datas.js";
import idModel from "../model/idModel.js";
import limit from "../model/limit.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import RawData from "../model/rawdata.js";
// import datas from "../model/datas.js";
//register
export const userRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        email: newUser.email,
      },
      "secret123"
    );

    return res.json({ status: "ok", user: token });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
//login
export const userData = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return { status: "error", error: "Invalid User" };
  }
  const isPasswordVaild = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (isPasswordVaild) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
};

// export const createSensor = async (req, res) => {
//   const { id, thickness, devicetemp, signal, batterylevel } = req.query;

//   try {
//     const sensor = new asset({
//       id: String(id),
//       thickness: String(thickness),
//       devicetemp: String(devicetemp),
//       signal: String(signal),
//       batterylevel: String(batterylevel),
//     });

//     const savesensor = await sensor.save();
//     res.status(200).json(savesensor);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// export const createSensor = async (req, res) => {
//   const { id, thickness, devicetemp, signal, batterylevel } = req.query;

//   let modifiedId = id;
//   if (id === "XY00001") {
//     modifiedId = "XY001";
//   }

//   try {
//     const rawData = new RawData({
//       id: String(id),
//       thickness: String(thickness),
//       devicetemp: String(devicetemp),
//       signal: String(signal),
//       batterylevel: String(batterylevel),
//     });

//     await rawData.save();

//     let adjustedBatteryLevel = (
//       ((parseFloat(batterylevel) - 265) * (100 - 0)) /
//       (540 - 265)
//     ).toFixed(2);
//     let adjustedSignal = (
//       ((parseFloat(signal) - 0) * (100 - 0)) /
//       (32 - 0)
//     ).toFixed(2);

//     if (adjustedBatteryLevel > 100) adjustedBatteryLevel = "100";
//     if (adjustedSignal > 100) adjustedSignal = "100";

//     const sensor = new asset({
//       id: String(modifiedId),
//       thickness: String(thickness),
//       devicetemp: String(devicetemp),
//       signal: String(adjustedSignal),
//       batterylevel: String(adjustedBatteryLevel),
//     });

//     const savesensor = await sensor.save();

//     // res.status(200).json(savesensor);
//     try {
//       const sensorData = await limit.aggregate([
//         { $sort: { id: 1, updatedAt: -1 } },
//         { $group: { _id: "$id", data: { $first: "$$ROOT" } } },
//         { $replaceRoot: { newRoot: "$data" } },
//         { $addFields: { idNumber: { $toInt: { $substr: ["$id", 2, -1] } } } },
//         { $sort: { idNumber: 1 } },
//         { $limit: 40 },
//       ]);

//       if (!sensorData || sensorData.length === 0) {
//         return res.status(404).json({ error: "No assets found" });
//       }

//       const updatedSensorData = sensorData.map((obj) => [
//         `#`,
//         obj.id,
//         obj.inputthickness,
//         obj.time,
//       ]);

//       const flattenedArray = updatedSensorData.flat();

//       res.json(flattenedArray);
//     } catch (error) {
//       console.error("Error fetching sensor data:", error);
//       res.status(500).json({ error: "Error fetching sensor data" });
//     }
//   } catch (error) {
//     console.error("Error saving sensor data:", error);
//     res.status(500).json({ error: "Error saving sensor data" });
//   }
// };

export const createSensor = async (req, res) => {
  // const { id, thickness, devicetemp, signal, batterylevel } = req.query;
  const {
    device_name,
    thickness,
    device_status,
    signal_strength,
    battery_status,
  } = req.query;

  const date = new Date();
 
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  };
  const formattedTimestamp = date.toLocaleString('en-US', options);
  console.log('date', formattedTimestamp);

  try {
    const rawData = new RawData({
      id: String(device_name),
      thickness: String(thickness),
      devicetemp: String(device_status),
      signal: String(signal_strength),
      batterylevel: String(battery_status),
    });

    await rawData.save();

    let adjustedBatteryLevel = (
      ((parseFloat(battery_status) - 265) * (100 - 0)) /
      (540 - 265)
    ).toFixed(2);
    let adjustedSignal = (
      ((parseFloat(signal_strength) - 0) * (100 - 0)) /
      (32 - 0)
    ).toFixed(2);

    if (adjustedBatteryLevel > 100) adjustedBatteryLevel = "100";
    if (adjustedSignal > 100) adjustedSignal = "100";

    const sensor = new asset({
      id: String(device_name),
      thickness: String(thickness),
      devicetemp: String(device_status),
      signal: String(adjustedSignal),
      batterylevel: String(adjustedBatteryLevel),
      // timestamp: formattedTimestamp,
    });

    const savesensor = await sensor.save();

    // res.status(200).json(savesensor);
    try {
      const sensorData = await limit.aggregate([
        { $sort: { id: 1, updatedAt: -1 } },
        { $group: { _id: "$id", data: { $first: "$$ROOT" } } },
        { $replaceRoot: { newRoot: "$data" } },
        { $addFields: { idNumber: { $toInt: { $substr: ["$id", 2, -1] } } } },
        { $sort: { idNumber: 1 } },
        { $limit: 40 },
      ]);

      if (!sensorData || sensorData.length === 0) {
        return res.status(404).json({ error: "No assets found" });
      }

      const updatedSensorData = sensorData.map((obj) => [
        `#`,
        obj.id,
        obj.inputthickness,
        obj.time,
      ]);

      const flattenedArray = updatedSensorData.flat();

      res.json(flattenedArray);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
      res.status(500).json({ error: "Error fetching sensor data" });
    }
  } catch (error) {
    console.error("Error saving sensor data:", error);
    res.status(500).json({ error: "Error saving sensor data" });
  }
};

// export const timelimit = async (req, res) => {
//   const { id, time, inputthickness } = req.query;

//   try {
//     const tlimit = new limit({
//       id: String(id),
//       inputthickness: String(inputthickness),
//       time: String(time),
//     });

//     const savelimit = await tlimit.save();
//     res.status(200).json(savelimit);

//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

export const timelimit = async (req, res) => {
  const { id, time, inputthickness } = req.query;
  let changedtime;
  if (time == "1 Min") {
    changedtime = "1";
  } else if (time == "5 Min") {
    changedtime = "5";
  } else if (time == "1 Day") {
    changedtime = "1440";
  } else if (time == "2 Days") {
    changedtime = "2880";
  } else if (time == "7 Days") {
    changedtime = "10080";
  } else if (time == "15 Days") {
    changedtime = "21600";
  }
  try {
    const tlimit = new limit({
      id: String(id),
      inputthickness: String(inputthickness),
      time: changedtime, // Assign changedtime instead of time
    });

    const savelimit = await tlimit.save();
    res.status(200).json(savelimit);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getlogdata = async (req, res) => {
  try {
    // Fetch all documents from the asset collection
    const allData = await asset.find().limit(39).sort({id: -1});
    
    // Define the IDs you're interested in
    const idsOfInterest = [
      'XY00001', 'XY00002', 'XY00003', 'XY00004', 'XY00005', 'XY00006', 'XY00007', 'XY00008', 'XY00009', 'XY00010',
      'XY00011', 'XY00012', 'XY00013', 'XY00014', 'XY00015', 'XY00016', 'XY00017', 'XY00018', 'XY00019', 'XY00020',
      'XY00021', 'XY00022', 'XY00023', 'XY00024', 'XY00025', 'XY00026', 'XY00027', 'XY00028', 'XY00029', 'XY00030',
      'XY00031', 'XY00032', 'XY00033', 'XY00034', 'XY00035', 'XY00036', 'XY00037', 'XY00038', 'XY00039', 'XY00040'
    ];
        
    const filteredData = allData.filter(data => idsOfInterest.includes(data.id));
    filteredData.sort((a, b) => {
      return idsOfInterest.indexOf(a.id) - idsOfInterest.indexOf(b.id);
    });

    res.json(filteredData);
  } catch (error) {
    res.status(500).json(error);
  }
};

// export const getlogdata = async (req, res) => {
//   try {
//     // const logdata = await asset.aggregate([
//     //   { $sort: { id: 1, updatedAt: -1 } },
//     //   { $group: { _id: "$id", data: { $first: "$$ROOT" } } },
//     //   { $replaceRoot: { newRoot: "$data" } },
//     //   { $addFields: { idNumber: { $toInt: { $substr: ["$id", 2, -1] } } } },
//     //   { $sort: { idNumber: 1 } },
//     //   { $project: { idNumber: 0 } },
//     //   { $limit: 40 },
//     // ]);

//     // if (!logdata || logdata.length === 0) {
//     //   return res.status(404).json({ error: "No assets found" });
//     // }


//     const data1 = await asset.find({ id: 'XY00001' }).sort({_id: -1}).limit(1);
//     const data2 = await asset.find({ id: 'XY00002' }).sort({_id: -1}).limit(1);
//     const data3 = await asset.find({ id: 'XY00003' }).sort({_id: -1}).limit(1);
//     const data4 = await asset.find({ id: 'XY00004' }).sort({_id: -1}).limit(1);
//     const data5 = await asset.find({ id: 'XY00005' }).sort({_id: -1}).limit(1);
//     const data6 = await asset.find({ id: 'XY00006' }).sort({_id: -1}).limit(1);
//     const data7 = await asset.find({ id: 'XY00007' }).sort({_id: -1}).limit(1);
//     const data8 = await asset.find({ id: 'XY00008' }).sort({_id: -1}).limit(1);
//     const data9 = await asset.find({ id: 'XY00009' }).sort({_id: -1}).limit(1);
//     const data10 = await asset.find({ id: 'XY00010' }).sort({_id: -1}).limit(1);
//     const data11 = await asset.find({ id: 'XY00011' }).sort({_id: -1}).limit(1);
//     const data12 = await asset.find({ id: 'XY00012' }).sort({_id: -1}).limit(1);
//     const data40 = await asset.find({ id: 'XY00040' }).sort({_id: -1}).limit(1);

//     res.json(data1);
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

export const exceldata = async (req, res) => {
  const { id: deviceid, date1, date2 } = req.query;

  try {
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    const assetDocumentArray = await asset.model("datas").find({
      id: deviceid,
      $and: [
        { createdAt: { $gte: startDate } },
        { createdAt: { $lte: endDate } },
      ],
    });
    console.log("Device ID:", deviceid);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    console.log("Found asset documents:", assetDocumentArray);

    res.json(assetDocumentArray);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export const rawdataapi = async (req, res) => {
  try {
    const rawData = await RawData.find().limit(500).sort({ updatedAt: -1 });
    res.json(rawData);
  } catch (error) {
    console.error("Error fetching raw data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const exceldata = async (req, res) => {
//   const { id: deviceid, date1, date2 } = req.query;

//   try {
//     const assetDocumentArray = await asset.model("datas").find({
//       id: deviceid,
//       $and: [{ createdAt: { $gte: date1 } }, { createdAt: { $lte: date2 } }],
//     });

//     console.log("Found asset documents:", assetDocumentArray);

//     res.json(assetDocumentArray);
//   } catch (error) {
//     console.error("Error:", error);
//     res
//       .status(500)
//       .json({ error: "Internal Server Error", details: error.message });
//   }
// };

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
      .model("datas")
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

// export const tabledatas = async (req, res) => {
//   const { id } = req.params;
//   console.log("Received id:", id);

//   try {
//     const sensorData = await idModel({
//       id: String(id),
//     });

//     const dataid = await sensorData.save();
//     const deviceid = dataid.id;

//     const assetDocumentArray = await mongoose
//       .model("datas")
//       .find({
//         id: deviceid,
//       })
//       .sort({ createdAt: -1 })
//       .limit(30);

//     if (!assetDocumentArray || assetDocumentArray.length === 0) {
//       res.status(404).json({ error: "Asset not found" });
//       return;
//     }

//     const response = assetDocumentArray.map((assetDocument) => {
//       const responseData = {
//         id: assetDocument.id,
//         createdAt: assetDocument.createdAt,
//         thickness: assetDocument.thickness,
//         batterylevel: assetDocument.batterylevel,
//         devicetemp: assetDocument.devicetemp,
//         signal: assetDocument.signal,
//         updatedAt: assetDocument.updatedAt,
//         __v: assetDocument.__v,
//         _id: assetDocument._id,
//       };
//       return responseData;
//     });

//     res.json(response);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

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
      .model("datas")
      .find({ id: deviceid })
      .sort({ createdAt: -1 })
      .limit(30);

    const limitsdatas = await limit
      .find({ id: id })
      .sort({ updatedAt: -1 })
      .limit(30);

    if (!assetDocumentArray || assetDocumentArray.length === 0) {
      res.status(404).json({ error: "Asset not found" });
      return;
    }

    if (!limitsdatas || limitsdatas.length === 0) {
      res.status(404).json({ error: "Limits data not found" });
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
        inputthickness: limitsdatas[0].inputthickness,
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

export const allsetlimit = async (req, res) => {
  try {
    const sensorData = await limit.aggregate([
      { $sort: { id: 1, updatedAt: -1 } },
      { $group: { _id: "$id", data: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$data" } },
      { $addFields: { idNumber: { $toInt: { $substr: ["$id", 2, -1] } } } },
      { $sort: { idNumber: 1 } },
      { $project: { idNumber: 0 } },
      { $limit: 40 },
    ]);

    if (!sensorData || sensorData.length === 0) {
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

//     const assetDocument = await mongoose.model("datas").findOne({
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

//     const assetDocument = await mongoose.model("datas").findOne({
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
