import React from 'react';

const Model = () => {

  

  const rectangleStyle = {
    width: '320px',
    height: '430px',
    backgroundColor: 'white',
    border: '2px solid gray',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',  // Change flex direction to column
    justifyContent: 'space-between',
    padding: '10px',
    overflowX: 'auto',
    direction: 'rtl',

    // Additional styles for mobile view
    '@media (max-width: 600px)': {
      width: '100%',
      overflowX: 'auto',
      flexDirection: 'row',
      whiteSpace: 'nowrap',
    },
  };

  const sbox = {
    width: '60px', 
    height: '30px', 
    backgroundColor: 'lightgreen', 
    borderRadius: '5px', 
    marginLeft: '5px', 
    textAlign: 'center'
    };
  
  const smallBoxStyle = {
    width: '80%',
    height: '30px',
    backgroundColor: 'lightblue',
    border: '1px solid gray',
    borderRadius: '5px',
    textAlign: 'center',
    lineHeight: '30px',
    margin: '5px',
    cursor: 'pointer',
    marginTop: '0'
  };
  
  const handleSmallBoxClick = (value) => {
    alert(`Small box ${value} clicked!`);
  };

  const renderSmallBoxes = () => {
  const groups = Array.from({ length: 4 }, (_, groupIndex) =>
    Array.from({ length: 10 }, (_, index) => `Device ${groupIndex * 10 + index + 1}`)
  );

  const dataArray = [
    1, 15, 22, 8, 37, 4, 30, 12, 26, 18, 9, 35, 3, 20, 7, 29, 14, 31, 25, 10, 36, 2, 19, 5, 28, 13, 32, 23, 6, 38, 17, 27, 11, 33, 16, 39, 21, 34, 24, 40
  ];

  const groupDivs = groups.map((group, groupIndex) => (
    <div key={groupIndex} style={rectangleStyle}>
      {group.map((text, index) => (
        <div key={index} style={{ display: 'flex' }}>
          <div style={smallBoxStyle} onClick={() => handleSmallBoxClick(text)}>
            {text}
          </div>
          <div style={sbox}> {dataArray[index]} </div>
        </div>
      ))}
    </div>
  ));

  return groupDivs;
};

  return (
    <div>
      <div className='flex gap-4 items-center justify-center w-full overflow-x-auto md:overflow-x-hidden'>
        {renderSmallBoxes()}
      </div>
    </div>
  );
};

export default Model;
