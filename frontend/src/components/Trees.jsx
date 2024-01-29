import React from "react";

const Trees = () => {
  const lineStyle = {
    position: "relative",
    left: "450px",
    top: "20px",
    width: "1000px",
    height: "400px",
    borderBottom: "3px solid black", // You can customize the line style here
    transform: "skewY(-140deg)", // Adjust the angle of the slant
  };
  const left1 = {
    position: "aboslute",
    left: "-7px",
    top: "-100px",
    width: "700px",
    height: 0,
    borderBottom: "3px solid black", // You can customize the line style here
    transform: "skewY(0deg)", // Adjust the angle of the slant
  };

  const right1 = {
    position: "aboslute",
    left: "-7px",
    top: "-200px",
    width: "700px",
    height: 0,
    borderBottom: "3px solid black", // You can customize the line style here
    transform: "skewY(0deg)", // Adjust the angle of the slant
  };
  return (
    <div>
      <div style={lineStyle}></div>
      <div style={left1}></div>
    </div>
  );
};

export default Trees;
