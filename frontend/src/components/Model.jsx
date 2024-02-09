import React, { useEffect, useState } from "react";

const Model = () => {
   const [dataArray, setDataArray] = useState([]);
  // const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/sensor/data");
        const data = await response.json();
        const thicknessArray = data
          .map((sensor) => parseInt(sensor.thickness))
          .reverse();
        setDataArray(thicknessArray);
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

  const handleSmallBoxClick = (text) => {
    const deviceNumber = parseInt(text.replace("Device ", ""), 10);
    // alert(`Small box ${deviceNumber} clicked!`);
      setDeviceNumberForEffect(deviceNumber);
  };

  const [deviceNumberForEffect, setDeviceNumberForEffect] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (deviceNumberForEffect !== null) {
        try {
          const response = await fetch(`http://localhost:4000/sensor/getdata/xy00${deviceNumberForEffect}`);
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [deviceNumberForEffect]); 
  

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
    <div>
      <div className="flex gap-4 items-center justify-center w-full overflow-x-auto md:overflow-x-hidden">
        {renderSmallBoxes()}
      </div>
    </div>
  );
};

export default Model;
