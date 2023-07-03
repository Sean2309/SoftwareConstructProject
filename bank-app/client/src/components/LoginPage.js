import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
      
        axios.post('http://localhost:3001/Login', { email, password })
          .then(response => {
            // Handle the successful login response
            console.log(response.data);
            if(response.data ==="Success"){
                console.log("Redirect to specified page")
                useNavigate('marketplace')
            }
          })
          .catch(error => {
            // Handle the error response
            console.error(error);
          });
      }
      

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { email, password } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">EMAIL ID: </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                    <br />

                    <label htmlFor="password">PASSWORD: </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
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

export default LoginPage;
