import mongoose from "mongoose";
import asset from "../model/datas.js";
import idModel from "../model/idModel.js";
import limit from "../model/limit.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import RawData from "../model/rawdata.js";
import moment from 'moment';

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

export const createSensor = async (req, res) => {
  const {
    device_name,
    thickness,
    device_status,
    signal_strength,
    battery,
  } = req.query;

  const date = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  };
  try {
    const formattedTimestamp = date.toLocaleString('en-US', options);

    const rawData = new RawData({
      device_name: String(device_name),
      thickness: String(thickness),
      device_status: String(device_status),
      signal_strength: String(signal_strength),
      battery_status: String(battery),
      timestamp: formattedTimestamp,

    });

    await rawData.save();

    let adjustedBatteryLevel = (
      ((parseFloat(battery) - 265) * (100 - 0)) /
      (540 - 265)
    ).toFixed(2);
    let adjustedSignal = (
      ((parseFloat(signal_strength) - 0) * (100 - 0)) /
      (32 - 0)
    ).toFixed(2);

    if (adjustedBatteryLevel > 100) adjustedBatteryLevel = "100";
    if (adjustedSignal > 100) adjustedSignal = "100";

    const sensor = new asset({
      device_name: String(device_name),
      thickness: String(thickness),
      device_status: String(device_status),
      signal_strength: String(adjustedSignal),
      battery_status: String(adjustedBatteryLevel),
      timestamp: formattedTimestamp,
    });

    const savesensor = await sensor.save();

    // res.status(200).json(savesensor);
    try {
      const sensorData = await limit.aggregate([
        { $sort: { device_name: 1, _id: -1 } },
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
        obj.device_name,
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

export const timelimit = async (req, res) => {
  const { device_name, time, inputthickness } = req.query;
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
      device_name: String(device_name),
      inputthickness: String(inputthickness),
      time: changedtime, // Assign changedtime instead of time
    });

    const savelimit = await tlimit.save();
    res.status(200).json(savelimit);
  } catch (error) {
    res.status(500).json(error);
  }
};



// export const getlogdata = async (req, res) => {
//   try {
//     // Fetch all documents from the asset collection
//     const allData = await asset.find().limit(40).sort({ device_name: 1, timestamp: -1  });

//     // Define the device names you're interested in
//     const deviceNamesOfInterest = [
//       'XY00001', 'XY00002', 'XY00003', 'XY00004', 'XY00005', 'XY00006', 'XY00007', 'XY00008', 'XY00009', 'XY00010',
//       'XY00011', 'XY00012', 'XY00013', 'XY00014', 'XY00015', 'XY00016', 'XY00017', 'XY00018', 'XY00019', 'XY00020',
//       'XY00021', 'XY00022', 'XY00023', 'XY00024', 'XY00025', 'XY00026', 'XY00027', 'XY00028', 'XY00029', 'XY00030',
//       'XY00031', 'XY00032', 'XY00033', 'XY00034', 'XY00035', 'XY00036', 'XY00037', 'XY00038', 'XY00039', 'XY00040'
//     ];

//     const filteredData = allData.filter(data => deviceNamesOfInterest.includes(data.device_name));
//     filteredData.sort((a, b) => {
//       return deviceNamesOfInterest.indexOf(a.device_name) - deviceNamesOfInterest.indexOf(b.device_name);
//     });

//     res.json(filteredData);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

export const getlogdata = async (req, res) => {
  try {
    const logdata = await asset.aggregate([
      { $match: { device_name: { $nin: ["sensor1", "XY0001", "sensor2"], $type: "string" } } }, // Filter out non-string values for device_name
      { $sort: { device_name: 1, _id: -1 } },
      { $group: { _id: "$device_name", data: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$data" } },
      {
        $addFields: {
          idNumber: {
            $cond: [
              { $regexMatch: { input: "$device_name", regex: /\d+$/ } }, // Check if device_name ends with digits
              { $toInt: { $substrBytes: ["$device_name", { $subtract: [{ $strLenBytes: "$device_name" }, 1] }, -1] } }, // Extract digits and convert to integer
              0 // Set idNumber to 0 if device_name doesn't end with digits
            ]
          }
        }
      },
      { $match: { idNumber: { $ne: 0 } } }, // Filter out documents where idNumber is 0
      { $sort: { idNumber: 1 } },
      { $project: { idNumber: 0 } },
      { $limit: 40 },
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
//     const allData = await asset.find();
//     console.log("Fetched data:", allData); // Log the fetched data for debugging
//     res.json(allData);
//   } catch (error) {
//     console.error("Error fetching data:", error); // Log the error for debugging
//     res.status(500).json({ error: "Error fetching data" }); // Send a generic error response
//   }
// };


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
    const sensorData = await idModel.findOne({ device_name: sensorId });

    if (!sensorData) {
      return res
        .status(404)
        .json({ error: `No data found for sensor ${sensorId}` });
    }

    const deviceid = sensorData.id;

    const events = await asset.find({ device_name: deviceid }).limit(1);

    res.status(200).json(events);
  } catch (error) {
    console.error(`Error fetching data for sensor ${sensorId}:`, error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export const exceldata = async (req, res) => {
  const { device_name: deviceid, date1, date2 } = req.query;

  try {
    const startDate = moment(date1, "YYYY-MM-DD").toDate();
    const endDate = moment(date2, "YYYY-MM-DD").toDate();
    const formattedStartDate = moment(startDate).format('MM/DD/YYYY');
    const formattedEndDate = moment(endDate).format('MM/DD/YYYY');
    const startTimeString = '00:00:01 AM';
    const endTimeString = '12:59:59 PM';
    const parsedStartDate = formattedStartDate + ', ' + startTimeString;
    const parsedEndDate = formattedEndDate + ', ' + endTimeString;
    const assetDocumentArray = await asset.find({
      device_name: deviceid,
      timestamp: { $gte: parsedStartDate, $lt: parsedEndDate }
    });
    res.json(assetDocumentArray);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// export const exceldata = async (req, res) => {
//   const { id: deviceid, date1, date2 } = req.query;

//   try {
//     const startDate = new Date(date1);
//     const endDate = new Date(date2);

//     const assetDocumentArray = await asset.find({
//       device_name: deviceid,
//       timestamp: { $gte: startDate, $lte: endDate }
//     });
//     console.log("Device ID:", deviceid);
//     console.log("Start Date:", startDate);
//     console.log("End Date:", endDate);

//     // console.log("Found asset documents:", assetDocumentArray);

//     res.json(assetDocumentArray);
//   } catch (error) {
//     console.error("Error:", error);
//     res
//       .status(500)
//       .json({ error: "Internal Server Error", details: error.message });
//   }
// };

export const rawdataapi = async (req, res) => {
  try {
    const rawData = await RawData.find().limit(500).sort({ _id: -1 });
    res.json(rawData);
  } catch (error) {
    console.error("Error fetching raw data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const iddata = async (req, res) => {
  const { id } = req.params;

  try {
    const sensorData = await idModel({
      device_name: String(id),
    });

    const dataid = await sensorData.save();
    const deviceid = dataid.device_name;

    const assetDocumentArray = await asset.find({ device_name: deviceid }).sort({ _id: -1 }).limit(30);

    if (!assetDocumentArray || assetDocumentArray.length === 0) {
      return res.status(404).json({ error: "No data found" });
    }

    const response = assetDocumentArray.map((assetDocument) => {
      const responseData = {
        device_name: assetDocument.device_name,
        device_status: assetDocument.device_status,
        signal_strength: assetDocument.signal_strength,
        timestamp: assetDocument.timestamp,
      };

      if (req.query.battery === "true") {
        responseData.battery_status = assetDocument.battery_status;
      }
      if (req.query.thickness === "true") {
        responseData.thickness = assetDocument.thickness;
      }

      return responseData;
    });

    res.json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// export const iddata = async (req, res) => {
//   const { id } = req.params;
//   console.log("Received id:", id);

//   try {
//     const assetDocumentArray = await mongoose
//       .model("data") // Ensure correct model name is used
//       .find({ device_name: id })
//       .sort({ timestamp: -1 })
//       .limit(30);

//     if (!assetDocumentArray || assetDocumentArray.length === 0) {
//       return res.status(404).json({ error: "Asset not found" });
//     }

//     const response = assetDocumentArray.map((assetDocument) => {
//       const responseData = {
//         device_name: assetDocument.device_name,
//         device_status: assetDocument.device_status,
//         signal_strength: assetDocument.signal_strength,
//         timestamp: assetDocument.timestamp,
//       };

//       if (req.query.battery === "true") {
//         responseData.battery_status = assetDocument.battery_status;
//       }
//       if (req.query.thickness === "true") {
//         responseData.thickness = assetDocument.thickness;
//       }

//       return responseData;
//     });

//     res.json(response);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


export const tabledatas = async (req, res) => {
  const { id } = req.params;
  console.log("Received id:", id);

  try {
    // Query the 'asset' collection directly using the 'device_name'
    const assetDocumentArray = await asset
      .find({ device_name: id })
      .sort({ _id: -1 })
      .limit(30);

    const limitsdatas = await limit
      .find({ device_name: id })
      .sort({ _id: -1 })
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
        device_name: assetDocument.device_name,
        thickness: assetDocument.thickness,
        battery_status: assetDocument.battery_status,
        device_status: assetDocument.device_status,
        signal_strength: assetDocument.signal_strength,
        inputthickness: limitsdatas[0].inputthickness,
        timestamp: assetDocument.timestamp,
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

export const apilimit = async (req, res) => {
  try {
    const limitdataapi = await limit.aggregate([
      { $match: { device_name: { $nin: ["sensor1", "XY0001", "sensor2"], $type: "string" } } },
      { $sort: { device_name: 1, _id: -1 } },
      { $group: { _id: "$device_name", latestData: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$latestData" } },
      {
        $addFields: {
          idNumber: {
            $cond: [
              { $regexMatch: { input: "$device_name", regex: /\d+$/ } },
              { $toInt: { $substrBytes: ["$device_name", { $subtract: [{ $strLenBytes: "$device_name" }, 1] }, -1] } }, // Extract digits and convert to integer
              0
            ]
          }
        }
      },
      { $match: { idNumber: { $ne: 0 } } },
      { $sort: { idNumber: 1 } },
      {
        $project: {
          device_name: 1,
          time: 1,
          inputthickness: 1,
          _id: 0
        }
      },
      { $sort: { device_name: 1 } }, // Add this stage to sort by device_name
      { $limit: 40 }
    ]);

    res.json(limitdataapi);
  } catch (error) {
    console.error("Error fetching raw data:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
        device_name: assetDocument.device_name,
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
    const sensorData = await limit.findOne({ device_name: id });

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
    const sensorData = await limit.findOne({ device_name: id }).sort({ _id: -1 });

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
      { $sort: { device_name: 1, _id: -1 } },
      { $group: { _id: "$device_name", data: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$data" } },
      { $addFields: { idNumber: { $toInt: { $substr: ["$device_name", 2, -1] } } } },
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
