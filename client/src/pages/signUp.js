import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import API from "../utils/API"
import { Input, TextArea, FormBtn } from "../components/input";
import { Col, Row, Container } from "../components/grid";

class Login extends Component {

    state = {
        username: "",
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

        if (this.state.username && this.state.email && this.state.password) {
            API.getUser(this.state.username)
                .then(results => {

                    if (results.data.length > 0) {
                        this.setState({ error: "User ID already exist" })
                        this.setState({
                            username: "",
                            email: "",
                            password: "",
                        })
                        return 0;
                    }
                    else {

                        API.getEmail(this.state.email)
                            .then(results => {
                                if (results.data.length > 0) {
                                    console.log(results.data.length)
                                    this.setState({ error: "Email already exist" })
                                    this.setState({
                                        username: "",
                                        email: "",
                                        password: "",
                                    })
                                    return 0;
                                }
                                else {
                                    API.signupUser({
                                        username: this.state.username,
                                        email: this.state.email,
                                        password: this.state.password
                                    })
                                        .then(res => {
                                            this.setState({ error: "Signup Successful. Go to Login Page to Login" })
                                            this.setState({
                                                username: "",
                                                email: "",
                                                password: "",
                                            })
                                        })
                                        .catch(err => console.log(err));
                                }
                            })
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));
        }

    }

    render() {
        return (
            <Wrapper>
                <h2 className="text-center pt-3">SignUp to Macklist!</h2><br />
                <div className="mx-5">
                    <Col>
                        <form onSubmit={this.handleFormSubmit}>
                            <p>{this.state.error}</p>
                            <Input
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                name="username"
                                type="text"
                                pattern="[A-Za-z0-9]{6,}"
                                placeholder="Enter Username"
                                required
                                title="Username can only contain Uppercase, Lowercase or number and atleast 6 or more characters"
                            />
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
                            <Input
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                name="password"
                                type="password"
                                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                placeholder="Enter Password"
                                required
                            />
                            <button type="submit" id="login-page-btn" className="btn btn-success mb-2">SignUp</button>
                        </form>
                        <a className="btn btn-success"id="login-page-btn1" href="/login">LogIn</a><br />
                    </Col>
                </div>
            </Wrapper>
        )
    }
}

export default Login;