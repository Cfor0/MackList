import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import API from "../utils/API"
import { Input, TextArea, FormBtn } from "../components/input";
import { Col, Row, Container } from "../components/grid";
const bcrypt = require('bcryptjs');

class ForgotPassword extends Component {
    state = {
        email: "",
        password: "",
        error: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.email) {
            API.getEmail(this.state.email)
                .then(results => {
                    if (results.data.length > 0) {
                        this.setState({ password: (Math.floor((Math.random() * 90000000) + 9999999)).toString() })
                        const newPassword = bcrypt.hashSync(this.state.password, 10)
                        console.log(results)
                        API.forgotPassword({ email: this.state.email, password: newPassword, plainpass: this.state.password })
                            .then(results => {
                                this.setState({ error: "Recovery email sent" })
                            }).catch(err => console.log(err));
                    } else {
                        this.setState({ error: "The email address you provided does not have an account." })
                    }
                }).catch(err => console.log(err));
        }

    }

    newPassword = (event) => {
        event.preventDefault();
        const email = this.state.email;
        this.setState({ password: Math.floor((Math.random() * 90000000) + 9999999) })
        const newPassword = bcrypt.hashSync(this.state.password, 10)
        API.updatePassword({
            email: email,
            password: newPassword,
            plainpass: this.state.password
        }).then(res => {
            this.setState({ error: "Password has been changed. Logout and Log back in for changes to take place.", password: "" })
        }).catch(err => console.log(err));
        this.setState({ error: "" })
    }

    render() {
        return (
            <Wrapper>
                <h2 className="text-center pt-3">Forgot Password?</h2><br />
                <h5 className="text-center">Please enter the email address associated to your account!</h5>
                <div className="mx-5">
                    <Col>
                        <form onSubmit={this.handleFormSubmit}>
                            <p>{this.state.error}</p>
                            <Input
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                name="email"
                                type="email"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                placeholder="Enter Email Address"
                                required
                                title="Must be in the following order: characters@characters.domain"
                            />
                            <button type="submit" id="login-page-btn" className="btn btn-success mb-2">Submit Request</button>
                        </form>
                    </Col>
                </div>
            </Wrapper>
        )
    }

}

export default ForgotPassword;