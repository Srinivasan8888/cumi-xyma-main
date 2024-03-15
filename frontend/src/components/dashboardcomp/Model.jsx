import React, { useEffect, useState } from "react";

const Model = ({ handleSmallBoxClick, onLimitValuesChange }) => {
  const [limitValues, setLimitValues] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [limitData, setLimitData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch("http://localhost:4000/sensor/data");
        const data1 = await response1.json();
        const thicknessArray = data1.map(sensor => parseInt(sensor.thickness));

        const timevalue1 = data1.map(sensor=> (sensor.createdAt));
        const formatDate = (timevalue1) => {
          const date = new Date(timevalue1);
          return date.toLocaleString(); 
        }
        const formattedDates = timevalue1.map(formatDate);
        console.log("json for time", formattedDates);

        const response2 = await fetch("http://localhost:4000/sensor/alllimitdata");
        const data2 = await response2.json();
        const limitData = data2.map(sensor => parseInt(sensor.inputthickness));

        console.log("thicknessArray:" , thicknessArray);
        console.log("limitData:" , limitData);
        
        const limitValues = thicknessArray.map((thickness, index) => {
          const limitValue = ((thickness - 0) * (100 - 0)) / (limitData[index] - 0) + 0;
          return limitValue.toFixed(2);
        });
        console.log("limitvalues", limitValues);


        // setLimitValues(limitValues);
        // setLimitData(limitData);
        setDataArray(limitValues);
        // console.log("limitsdata", limitData);
        onLimitValuesChange(limitValues, limitData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);


  const getColorBasedOnPercentage = (percentage) => {

    if(percentage > 100){
      return "lightblue";
    }else if (percentage >= 75) {
      return "lightgreen";
    } else if (percentage >= 50) {
      return "orange";
    } else {
      return "red";
    }
  };

   

  const rectangleStyle = {
    width: "320px",
    height: "430px",
    backgroundColor: "white",
    border: "2px solid gray",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "10px",
    overflowX: "auto",
    direction: "rtl",

    "@media (max-width: 600px)": {
      width: "100%",
      overflowX: "auto",
      flexDirection: "row",
      whiteSpace: "nowrap",
    },
  };

  const smallBoxStyle = {
    width: "80%",
    height: "30px",
    border: "1px solid gray",
    borderRadius: "5px",
    textAlign: "center",
    lineHeight: "30px",
    margin: "5px",
    cursor: "pointer",
    marginTop: "0",
  };

  const renderSmallBoxes = () => {
    const groups = Array.from({ length: 4 }, (_, groupIndex) =>
      Array.from(
        { length: 10 },
        (_, index) => `Device ${groupIndex * 10 + index + 1}`
      )
    );

    const groupDivs = groups.map((group, groupIndex) => (
      <div key={groupIndex} style={rectangleStyle}>
        {group.map((text, index) => {
          const value = dataArray[groupIndex * 10 + index];
          const backgroundColor = getColorBasedOnPercentage(value);
          return (
            <div key={index} style={{ display: "flex" }}>
              <div
                style={{
                  ...smallBoxStyle,
                  backgroundColor: backgroundColor,
                }}
                onClick={() => handleSmallBoxClick(text, limitValues)}
              >
                {text}
              </div>
              <div
                style={{
                  ...smallBoxStyle,
                  width: "60px",
                  backgroundColor: backgroundColor,
                  marginLeft: "5px",
                }}
                onClick={() => handleSmallBoxClick(text, limitValues)}
              >
                {value}
              </div>
            </div>
          );
        })}
      </div>
    ));

    return groupDivs;
  };

  return (
    <div className="flex gap-2 items-center justify-center w-full overflow-x-auto md:overflow-x-hidden">
      {renderSmallBoxes()}
    </div>
  );
};

export default Model;


// import React, { useEffect, useState } from "react";

// const Model = ({ handleSmallBoxClick, onLimitValuesChange }) => {
//   const [limitValues, setLimitValues] = useState([]);
//   const [dataArray, setDataArray] = useState([]);
//   const [limitData, setLimitData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response1 = await fetch("http://localhost:4000/sensor/data");
//         const data1 = await response1.json();
//         const thicknessArray = data1.map(sensor => parseInt(sensor.thickness));

//         const timevalue1 = data1.map(sensor=> (sensor.createdAt));
//         const formatDate = (timevalue1) => {
//           const date = new Date(timevalue1);
//           return date.toLocaleString(); 
//         }
//         const formattedDates = timevalue1.map(formatDate);
//         console.log("json for time", formattedDates);

//         const response2 = await fetch("http://localhost:4000/sensor/alllimitdata");
//         const data2 = await response2.json();
//         const limitData = data2.map(sensor => parseInt(sensor.inputthickness));

//         console.log("thicknessArray:" , thicknessArray);
//         console.log("limitData:" , limitData);
        
//         const limitValues = thicknessArray.map((thickness, index) => {
//           const limitValue = ((thickness - 0) * (100 - 0)) / (limitData[index] - 0) + 0;
//           return limitValue.toFixed(2);
//         });
//         console.log("limitvalues", limitValues);


//         // setLimitValues(limitValues);
//         // setLimitData(limitData);
//         setDataArray(limitValues);
//         // console.log("limitsdata", limitData);
//         onLimitValuesChange(limitValues, limitData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//     const intervalId = setInterval(fetchData, 1000);
//     return () => clearInterval(intervalId);
//   }, []);


//   const getColorBasedOnPercentage = (percentage) => {

//     if (percentage > 100) {
//       return "bg-sky-400";
//   } else if (percentage >= 75) {
//       return "bg-green-400";
//   } else if (percentage >= 50) {
//       return "bg-orange-400";
//   } else {
//       return "bg-red-500";
//   }
  
//   };

   

//   const rectangleStyle = {
//     width: "320px",
//     height: "430px",
//     backgroundColor: "white",
//     border: "2px solid gray",
//     borderRadius: "10px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     padding: "10px",
//     overflowX: "auto",
//     direction: "rtl",

//     "@media (max-width: 600px)": {
//       width: "100%",
//       overflowX: "auto",
//       flexDirection: "row",
//       whiteSpace: "nowrap",
//     },
//   };

//   const smallBoxStyle = {
//     width: "80%",
//     height: "30px",
//     border: "1px solid gray",
//     borderRadius: "5px",
//     textAlign: "center",
//     lineHeight: "30px",
//     margin: "5px",
//     cursor: "pointer",
//     marginTop: "0",
//   };

//   const renderSmallBoxes = () => {
//     const groups = Array.from({ length: 4 }, (_, groupIndex) =>
//       Array.from(
//         { length: 10 },
//         (_, index) => `Device ${groupIndex * 10 + index + 1}`
//       )
//     );

//     const groupDivs = groups.map((group, groupIndex) => (
//       <div key={groupIndex} className="flex gap-2 flex-wrap">
//         {group.map((text, index) => {
//           const value = dataArray[groupIndex * 10 + index];
//           const backgroundColorClass = getColorBasedOnPercentage(value);
//           return (
//             <div key={index} className="flex items-center">
//               <div
//                 className={`w-24 h-10 rounded-md flex items-center justify-center ${backgroundColorClass} text-white cursor-pointer`}
//                 onClick={() => handleSmallBoxClick(text, limitValues)}
//               >
//                 {text}
//               </div>
//               <div
//                 className={`w-14 h-10 rounded-md flex items-center justify-center ${backgroundColorClass} text-white ml-2 cursor-pointer`}
//                 onClick={() => handleSmallBoxClick(text, limitValues)}
//               >
//                 {value}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     ));
  

//     return groupDivs;
//   };

//   return (
//     <div className="flex gap-2 items-center justify-center w-full overflow-x-auto md:overflow-x-hidden">
//       {renderSmallBoxes()}
//     </div>
//   );
// };

// export default Model;
