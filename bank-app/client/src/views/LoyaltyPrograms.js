import React, { useEffect, useState } from 'react';

function LoyaltyPrograms() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/loyaltyPrograms')
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);


  return (
    <div>
      <h1>Loyalty Programs</h1>

      {backendData.loyaltyPrograms === undefined ? (
        <p>Loading...</p>
      ) : (
        backendData.loyaltyPrograms.map((program, index) => (
          <div key={index} style={loyaltyProgramStyle}>
            <h3>{program.programName}</h3>
            <p>Description: {program.description}</p>
            <p>Currency: {program.currencyName}</p>
            <p>Processing Time: {program.processingTime}</p>
            <a href={program.enrollmentLink}>Enrollment Link</a>
            <br />
            <a href={program.tncLink}>Terms and Conditions</a>
          </div>
        ))
      )}
    </div>
  );
}

// CSS style for the loyalty program box
const loyaltyProgramStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  margin: '10px',
  borderRadius: '5px',
  backgroundColor: '#f9f9f9',
};

export default LoyaltyPrograms;
