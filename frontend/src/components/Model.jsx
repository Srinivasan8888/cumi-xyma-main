import React from 'react';

const Model = () => {

  const rectangleStyle = {
    width: '320px',
    height: '430px',
    backgroundColor: 'white',
    border: '2px solid gray',
    borderRadius: '10px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '10px',
    overflowX: 'auto',
    direction: 'rtl',
  };

  const smallBoxStyle = {
    width: '90%',
    height: '30px',
    backgroundColor: 'lightblue',
    border: '1px solid gray',
    borderRadius: '5px',
    textAlign: 'center',
    lineHeight: '30px',
    margin: '5px',
    cursor: 'pointer'
  };

  const handleSmallBoxClick = (value) => {
    alert(`Small box ${value} clicked!`);
  };

  const renderSmallBoxes = () => {
    const texts = Array.from({ length: 40 }, (_, index) => `TAG ${index + 1}`);
    const smallBoxes = texts.map((text, index) => (
      <div key={index} style={smallBoxStyle} onClick={() => handleSmallBoxClick(text)}>
        {text}
      </div>
    ));
    return smallBoxes;
  };

  return (
    <div>
      <div className='flex gap-4 items-center justify-center w-full overflow-x-auto md:overflow-x-hidden'>
        <div className='flex justify-center' style={rectangleStyle}>
          {renderSmallBoxes()}
        </div>
        <div className='flex justify-center' style={rectangleStyle}>
          {renderSmallBoxes()}
        </div>
        <div className='flex justify-center' style={rectangleStyle}>
          {renderSmallBoxes()}
        </div>
        <div className='flex justify-center' style={rectangleStyle}>
          {renderSmallBoxes()}
        </div>
      </div>
    </div>
  );
};

export default Model;
