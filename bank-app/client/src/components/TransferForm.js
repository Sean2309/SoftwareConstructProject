import React, { Component } from 'react';
import axios from 'axios';

class TransferForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cardholderName: '',
            membershipNo: '',
            membershipNoConfirmation: '',
            transferAmount: ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { cardholderName, membershipNo, membershipNoConfirmation, transferAmount } = this.state;

        if (membershipNo === membershipNoConfirmation) {
            const form = {
                cardholderName,
                membershipNo,
                transferAmount
            };
            
            console.log(form);

            axios.post('http://localhost:3001/api/transferFormSubmit', form)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        else {
            // TODO
            return;
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { cardholderName, membershipNo, membershipNoConfirmation, transferAmount } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="cardholderName">PRIMARY CARDHOLDER</label>
                    <input
                        type="text"
                        id="cardholderName"
                        name="cardholderName"
                        value={cardholderName}
                        onChange={this.handleChange}
                    />
                    <br />

                    <label htmlFor="membershipNo">MEMBERSHIP #</label>
                    <input
                        type="text"
                        id="membershipNo"
                        name="membershipNo"
                        value={membershipNo}
                        onChange={this.handleChange}
                    />
                    <br />

                    <label htmlFor="membershipNoConfirmation">CONFIRM MEMBERSHIP #</label>
                    <input
                        type="text"
                        id="membershipNoConfirmation"
                        name="membershipNoConfirmation"
                        value={membershipNoConfirmation}
                        onChange={this.handleChange}
                    />
                    <br />

                    <label htmlFor="transferAmount">TRANSFER AMOUNT</label>
                    <input
                        type="text"
                        id="transferAmount"
                        name="transferAmount"
                        value={transferAmount}
                        onChange={this.handleChange}
                    />
                    <br />

                    <input
                        type="submit"
                        value="Submit"
                    />
                </form>
            </div>
        );
    }
}

export default TransferForm;
