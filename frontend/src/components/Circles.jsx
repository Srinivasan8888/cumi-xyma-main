import React, { useState } from 'react';

// Popup component
const Popup = ({ visible }) => {
  const popupStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the popup
    display: visible ? 'block' : 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '50px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  };

  const contentStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  return (
    <div style={popupStyle}>
      <div style={contentStyle}> Device ID: xy00001</div>
      <div style={contentStyle}>Thickness: 30mm</div>
    </div>
  );
};

const Circles = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
  };

  const outerCircleStyle = {
    width: '480px',
    height: '480px',
    borderRadius: '50%',
    backgroundColor: 'lightblue', // Outer circle color
    position: 'relative',
  };

  const innerCircleStyle = {
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    backgroundColor: 'white', // Inner circle color
    position: 'absolute',
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: 'translate(-50%, -50%)', // Center the inner circle
  };

  const pointStyle = {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'red', // Point color
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out',
  };

  const [hoveredPoint, setHoveredPoint] = useState(null);

  const generatePoints = () => {
    const points = [];
    const numberOfPoints = 20;

    for (let i = 0; i < numberOfPoints; i++) {
      const angle = (i / numberOfPoints) * 2 * Math.PI;
      const distanceFromCenter = 220; // Adjust the distance from the center
      const x = distanceFromCenter * Math.cos(angle);
      const y = distanceFromCenter * Math.sin(angle);

      const point = {
        ...pointStyle,
        top: '50%', // Center vertically
        left: '50%', // Center horizontally
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px) ${
          hoveredPoint === i ? 'scale(1.5)' : ''
        }`, // Translate the point to its position
      };

      points.push(
        <div
          key={i}
          style={point}
          onMouseEnter={() => setHoveredPoint(i)}
          onMouseLeave={() => setHoveredPoint(null)}
        ></div>
      );
    }

    return points;
  };

  return (
    <div style={containerStyle}>
      <div style={outerCircleStyle}>
        <div style={innerCircleStyle}>
          {generatePoints()}
          {hoveredPoint !== null && (
            <Popup
              x={pointStyle.left}
              y={pointStyle.top}
              visible={hoveredPoint !== null}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Circles;
