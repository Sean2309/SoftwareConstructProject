import React, { Component } from 'react';
import axios from 'axios';
import LoyaltyProgram from './LoyaltyProgram';

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
                    loyaltyProgramsData.map((data, index) => (
                        <LoyaltyProgram key={index} data={data} />
                    ))
                )}
            </div>
        );
    }
}

export default LoyaltyPrograms;
