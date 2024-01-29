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
    const groups = Array.from({ length: 4 }, (_, groupIndex) =>
      Array.from({ length: 10 }, (_, index) => `TAG ${groupIndex * 10 + index + 1}`)
    );

    const groupDivs = groups.map((group, groupIndex) => (
      <div key={groupIndex} style={rectangleStyle}>
        {group.map((text, index) => (
          <div key={index} style={smallBoxStyle} onClick={() => handleSmallBoxClick(text)}>
            {text}
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
