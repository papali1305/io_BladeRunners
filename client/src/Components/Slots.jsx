import React from "react";
import  { useState } from "react";

const Slots = () => {

  const [clickedIndex, setClickedIndex] = useState(null);

  // Handle box click
  const handleBoxClick = (index) => {
    setClickedIndex(index); 
  };


  const containerStyle = {
    height: '100vh', 
    width: '100%', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 120px)',
    gridTemplateRows: 'repeat(3, 1fr)',    
    gap: '20px', 
    width: '100%',
    height: '100%',
  };

  const boxStyle = {
    backgroundColor: 'transparent', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black', 
    fontSize: '1.2rem', 
    borderRadius: '8px', 
    height: '150px', 
    fontWeight: 'bold',
  };
  

  const getBorderColor = (borderStyle) => {
    const match = borderStyle.match(/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/); 
    return match ? match[0] : '#fff'; 
  };

  const positions = [
    { border: '4px solid #f86368' }, // Red border
    { border: '4px solid #68de7c' }, // Green border
    { border: '4px solid #f0c33c' }, // Yellow border
    { border: '4px solid #1ed14b' }, // Dark Green border
    { border: '4px solid #68de7c' }, // Green border
    { border: '4px solid #ff8085' }, // Light Red border
    { border: '4px solid #f86368' }, // Red border
    { border: '4px solid #68de7c' }, // Green border
    { border: '4px solid #f0c33c' }, // Yellow border
    { border: '4px solid #1ed14b' }, // Dark Green border
    { border: '4px solid #68de7c' }, // Green border
    { border: '4px solid #ff8085' }, // Light Red border
    { border: '4px solid #f86368' }, // Red border
    { border: '4px solid #68de7c' }, // Green border
    { border: '4px solid #f0c33c' }, // Yellow border
    { border: '4px solid #1ed14b' }, // Dark Green border
    { border: '4px solid #68de7c' }, // Green border
    { border: '4px solid #ff8085' }, // Light Red border
  ];

  return (

    <div style={{...containerStyle, backgroundColor:'#dcdcde'}}>
      <div style={gridStyle}>

        {/* {positions.map((style, index) => (
          <div key={index} style={{ ...boxStyle, ...style }}>
            Box {index + 1}
          </div>
        ))} */}

          {/* {positions.map((style, index) => (
          <div
            key={index}
            style={{
              ...boxStyle,
              ...style,
              ...(clickedIndex === index ? clickedBoxStyle : {}), // Apply clicked style if box is clicked
            }}
            onClick={() => handleBoxClick(index)} // Handle click on box
          >
            Box {index + 1}
          </div>
            ))} */}

          {positions.map((style, index) => (
          <div
            key={index}
            style={{
              ...boxStyle,
              ...style,
              backgroundColor: clickedIndex === index ? getBorderColor(style.border) : 'white', 
            }}
            onClick={() => handleBoxClick(index)} 
          >
            Box {index + 1}
          </div>
        ))}

      </div>
    </div>
  );
};

export default Slots;
