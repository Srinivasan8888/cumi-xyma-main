import React, { useEffect, useState } from "react";

const Model = ({ handleSmallBoxClick }) => {
  const [dataArray, setDataArray] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:4000/sensor/data");
  //       const data = await response.json();
  //       const thicknessArray = data
  //         .map((sensor) => parseInt(sensor.thickness));
  //         // console.log( "SAmaple thickness array", thicknessArray);
  //       // const limitvalue = ((intconvert-0)*(100-0))/(thicknessArray-0)+0;
  //       setDataArray(thicknessArray);

  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  //   const intervalId = setInterval(fetchData, 1000);
  //   return () => clearInterval(intervalId);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
        try {

            const response1 = await fetch("http://localhost:4000/sensor/data");
            const data1 = await response1.json();
            const thicknessArray = data1.map(sensor => parseInt(sensor.thickness));

            console.log("Data of thickness array", thicknessArray);

            const response2 = await fetch("http://localhost:4000/sensor/alllimitdata");
            const data2 = await response2.json();
            const limitData = data2.map(sensor => parseInt(sensor.inputthickness));

            console.log("Data of inputthickness array", limitData);

            const limitValues = thicknessArray.map(thickness => {
                return ((thickness - 0) * (100 - 0)) / (Math.max(...limitData, 0) - 0) + 0;
            });

            
            setDataArray(limitValues);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
}, []);


  const getColorBasedOnPercentage = (percentage) => {
    if (percentage >= 75) {
      return "lightgreen";
    } else if (percentage >= 50) {
      return "orange";
    } else {
      // return "#FF7074";
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
                onClick={() => handleSmallBoxClick(text)}
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
                onClick={() => handleSmallBoxClick(text)}
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
