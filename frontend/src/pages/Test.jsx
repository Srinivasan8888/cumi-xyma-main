import React, { useEffect, useState } from 'react';

const Test = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
          
          const response = await fetch('http://localhost:4000/sensor/data');
          const result = await response.json();
            const filteredData = result.filter(item => {
            const id = item.id; // Replace with your actual identifier property
            return id >= 'xy001' && id <= 'xy0040';
          });
  
          setData(filteredData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []); 
  
    
    return (
      <div>
        <h1>Your Component</h1>
        <ul>
          {data.map(item => (
            <li key={item.id}>{/* Render your item properties here */}</li>
          ))}
        </ul>
      </div>
    );
  };
export default Test