import React, { useEffect, useState } from "react";
import "../css/model.css";
import { baseUrl } from "../config";

const Model = ({ handleSmallBoxClick, onLimitValuesChange }) => {
  const [limitValues, setLimitValues] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [thicknessData, setThickness] = useState([]);
  const [limitData, setLimitData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(`${baseUrl}data`);
        const data1 = await response1.json();
        const thicknessArray = data1.map((sensor) =>
          parseFloat(sensor.thickness)
        );

        const response2 = await fetch(`${baseUrl}alllimitdata`);
        const data2 = await response2.json();
        const limitData = data2.map((sensor) =>
          parseFloat(sensor.inputthickness)
        );

        const limitData2 = data2.map(
          (sensor) => parseFloat(sensor.inputthickness) + parseFloat(2)
        );

        // const dataArray = [];

        // // Combine limitValues and comparisonArray into an object or array
        // for (let index = 0; index < thicknessArray.length; index++) {
        //   const limitValue =
        //     ((thicknessArray[index] - 0) * (100 - 0)) / (limitData[index] - 0) +
        //     0;
        //   const roundedLimitValue = limitValue.toFixed(2);
        //   const comparisonValue = thicknessArray[index] > limitData2[index];

        //   // Push both values into dataArray
        //   dataArray.push({
        //     limitValue: roundedLimitValue,
        //     comparisonValue: comparisonValue,
        //   });
        // }
        // setDataArray(dataArray);
        // console.log("DataArray", dataArray)

        const limitValues = thicknessArray.map((thickness, index) => {
          const limitValue =
            ((thickness - 0) * (100 - 0)) / (limitData[index] - 0) + 0;
          return limitValue.toFixed(2);
        });

        const comparisonArray = thicknessArray.map((thickness, index) => {
          return thickness > limitData2[index];
        });

        setDataArray(limitValues);
        setThickness(comparisonArray);
        console.log("thicknessData",thicknessData);
        onLimitValuesChange(limitValues, limitData);

        // console.log("comparisonArray",comparisonArray);
        // console.log("thicknessArray:", thicknessArray);
        // console.log("limitData:", limitData);
        // console.log("limitData2", limitData2)
        // console.log("limitvalue", limitValue);
        // const timevalue1 = data1.map((sensor) => sensor.createdAt);
        // const formatDate = (timevalue1) => {
        //   const date = new Date(timevalue1);
        //   return date.toLocaleString();
        // };

        // const formattedDates = timevalue1.map(formatDate);
        // console.log("json for time", formattedDates);

        // console.log("limitvalues", limitValues);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // console.log("thicknessData", thicknessData);

  // useEffect(() => {
  //   const valuess = thickness
  // });

  const getColorBasedOnPercentage = (percentage, value4) => {
    console.log("value4", value4);
    if (value4 == true) {
      return "#38BDF8";
    } else if (percentage >= 75 && value4 == false) {
      return "#28a33d";
    } else if (percentage >= 50 && percentage < 75) {
      return "#ED7014";
    } else if (percentage == null) {
      return "white";
    } else {
      return "#EF4444";
    }
  };

  const rectangleStyle = {
    width: "320px",
    height: "430px",
    backgroundColor: "pink",
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
      Array.from({ length: 10 }, (_, index) => {
        const number = groupIndex * 10 + index + 1;
        return `XY${
          number <= 9 ? "0000" + number : number <= 99 ? "000" + number : number
        }`;
      })
    );

    const handleClick = (text, value) => {
      // console.log("Clicked text:", text);
      // console.log("Clicked limit values:", value);
      const id = text.slice(2);
      // console.log("Small box clicked with ID: " + id);
      handleSmallBoxClick(text);
    };

    const groupDivs = groups.map((group, groupIndex) => (
      <div key={groupIndex} style={rectangleStyle}>
        {group.map((text, index) => {
          const dataIndex = groupIndex * 10 + index;
          const value = dataArray[dataIndex];
          const value2 = thicknessData[dataIndex];
          const backgroundColor = getColorBasedOnPercentage(value, value2);
          const showIcon = value > 108;
          const isDisabled = value == null;
          return (
            <div key={index} style={{ display: "flex" }}>
              <div
                style={{
                  ...smallBoxStyle,
                  backgroundColor: backgroundColor,
                }}
                onClick={() => {
                  if (!isDisabled) {
                    handleClick(text, value);
                  }
                }}
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
                onClick={() => {
                  if (!isDisabled) {
                    handleClick(text, value);
                  }
                }}
              >
                {showIcon ? (
                  <span
                    style={{
                      fontSize: "20px",
                      alignSelf: "flex-stretch",
                      marginBottom: "5px",
                    }}
                  >
                    ⚠️
                  </span>
                ) : (
                  value
                )}
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
