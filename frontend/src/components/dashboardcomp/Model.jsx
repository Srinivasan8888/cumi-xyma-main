import React, { useEffect, useState } from "react";
import "../css/model.css";

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

        const timevalue1 = data1.map(sensor => sensor.createdAt);
        const formatDate = (timevalue1) => {
          const date = new Date(timevalue1);
          return date.toLocaleString();
        }
        const formattedDates = timevalue1.map(formatDate);
        console.log("json for time", formattedDates);

        const response2 = await fetch("http://localhost:4000/sensor/alllimitdata");
        const data2 = await response2.json();
        const limitData = data2.map(sensor => parseInt(sensor.inputthickness));

        console.log("thicknessArray:", thicknessArray);
        console.log("limitData:", limitData);

        const limitValues = thicknessArray.map((thickness, index) => {
          const limitValue = ((thickness - 0) * (100 - 0)) / (limitData[index] - 0) + 0;
          return limitValue.toFixed(2);
        });
        console.log("limitvalues", limitValues);

        setDataArray(limitValues);
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
    if (percentage > 108) {
      return "#38BDF8";
    } else if (percentage >= 75 && percentage <= 108) {
      return "#28a33d";
    } else if (percentage >= 50 && percentage < 75) {
      return "#ED7014";
    } else {
      return "#EF4444";
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
    (_, index) => {
      const number = groupIndex * 10 + index + 1;
      return `XY${number <= 9 ? '0000' + number : (number <= 99 ? '000' + number : number)}`;
    }
  )
);


    const handleClick = (text, limitValues) => {
     
      console.log("Clicked text:", text);
  console.log("Clicked limit values:", limitValues);
  const id = text.slice(2); 
  console.log("Small box clicked with ID: " + id);
  handleSmallBoxClick(text);
      
    };

    const groupDivs = groups.map((group, groupIndex) => (
      <div key={groupIndex} style={rectangleStyle}>
        {group.map((text, index) => {
          const value = dataArray[groupIndex * 10 + index];
          const backgroundColor = getColorBasedOnPercentage(value);
          const showIcon = value > 108;
          return (
            <div key={index} style={{ display: "flex" }}>
              <div
                style={{
                  ...smallBoxStyle,
                  backgroundColor: backgroundColor,
                }}
                onClick={() => handleClick(text, groupIndex * 10 + index)}

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
                onClick={() => handleClick(text, groupIndex * 10 + index)}

              >
                {showIcon ? ( <span style={{ fontSize: "20px", alignSelf: "flex-stretch", marginBottom: "5px" }}>⚠️</span>  ) : (value)}
              </div>
            </div>
          );
        })}
      </div>
    ));

    return groupDivs;
  };

  return (
    <div className="flex gap-2 items-center justify-center w-full overflow-x-auto md:overflow-x-hidden scrollable-container">
      {renderSmallBoxes()}
    </div>
  );
};

export default Model;


// import React from "react";
// import "../css/model.css";

// const Model = ({ handleSmallBoxClick }) => {
//   
// 

//     const rectangleStyle = {
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

//  const renderSmallBoxes = () => {
//   const groups = Array.from({ length: 4 }, (_, groupIndex) =>
//   Array.from(
//     { length: 10 },
//     (_, index) => {
//       const number = groupIndex * 10 + index + 1;
//       return `XY${number <= 9 ? '0000' + number : (number <= 99 ? '000' + number : number)}`;
//     }
//   )
// );


//     const handleClick = (text, limitValues) => {
     
//       const id = text.slice(2); 
//       console.log("Small box clicked with ID:", id);
//       handleSmallBoxClick(id, limitValues);
      
//     };

//     const groupDivs = groups.map((group, groupIndex) => (
//       <div key={groupIndex} style={rectangleStyle}>
//         {group.map((text, index) => {
//           const value = dataArray[groupIndex * 10 + index];
//           const backgroundColor = getColorBasedOnPercentage(value);
//           const showIcon = value > 108;
//           return (
//             <div key={index} style={{ display: "flex" }}>
//               <div
//                 style={{
//                   ...smallBoxStyle,
//                   backgroundColor: backgroundColor,
//                 }}
//                 onClick={() => handleClick(text, groupIndex * 10 + index)}

//               >
//                  {text}
//               </div>
//               <div
//                 style={{
//                   ...smallBoxStyle,
//                   width: "60px",
//                   backgroundColor: backgroundColor,
//                   marginLeft: "5px",
//                 }}
//                 onClick={() => handleClick(text, groupIndex * 10 + index)}

//               >
//                 {showIcon ? ( <span style={{ fontSize: "20px", alignSelf: "flex-stretch", marginBottom: "5px" }}>⚠️</span>  ) : (value)}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     ));

//     return groupDivs;
//   };

//   return (
//     <div className="flex gap-2 items-center justify-center w-full overflow-x-auto md:overflow-x-hidden scrollable-container">
//       {renderSmallBoxes()}
//     </div>
//   );
// };

// export default Model;
