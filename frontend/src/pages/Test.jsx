import React from 'react'
import Model from '../components/dashboardcomp/Model'

const Test = () => {

  const handleSmallBoxClick = (id) => {
    alert(`Small box clicked with ID: ${id}`);
  };

  return (
    <div>
      <Model  handleSmallBoxClick={handleSmallBoxClick}/>
    </div>
  )
}

export default Test