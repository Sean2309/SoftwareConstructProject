import React, { Component } from 'react';

class LoyaltyProgram extends Component {

    render() {
        const { data } = this.props;

        return (
            <div style={loyaltyProgramStyle}>
                <h3>{data.programName}</h3>
                <p>Description: {data.description}</p>
                <p>Currency: {data.currencyName}</p>
                <p>Processing Time: {data.processingTime}</p>
                <a href={data.enrollmentLink}>Enrollment Link</a>
                <br />
                <a href={data.tncLink}>Terms and Conditions</a>
            </div>
        );
    }

}

// CSS style for the loyalty program box
const loyaltyProgramStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
};

export default LoyaltyProgram;