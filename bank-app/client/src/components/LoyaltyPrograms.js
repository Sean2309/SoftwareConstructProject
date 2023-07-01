import React, { Component } from 'react';
import axios from 'axios';

class LoyaltyPrograms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loyaltyProgramsData: [],
        };
    }

    getLoyaltyPrograms = async () => {
        const loyaltyProgramsQueryResponse = await axios.get('http://localhost:3001/api/loyaltyPrograms');
        const loyaltyProgramsQueryData = loyaltyProgramsQueryResponse.data.loyaltyPrograms;
        this.setState({ loyaltyProgramsData: loyaltyProgramsQueryData });
    }

    componentDidMount() {
        this.getLoyaltyPrograms();
    }

    render() {
        const { loyaltyProgramsData } = this.state;

        return (
            <div>
                <h1>Loyalty Programs</h1>

                {loyaltyProgramsData === undefined ? (
                    <p>Loading...</p>
                ) : (
                    loyaltyProgramsData.map((program, index) => (
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
