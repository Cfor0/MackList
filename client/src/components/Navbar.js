import React, { Component } from 'react'
import axios from 'axios'
import Wrapper from "../components/Wrapper"
import { Input, TextArea, FormBtn } from "../components/input";
import API from "../utils/API";
import okapi from "./styles/okapi.png"

const bcrypt = require('bcryptjs');

class Navbar extends Component {

  constructor() {
    super()
    this.logout = this.logout.bind(this)
  }

  state = {
    username: "",
    password: "",
    error:""
  }

  mystyle = {
    
    color: "rgb(235, 237, 217)"
          
    };

 
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: ""
    });
  };

  clearError = (event) => {
    event.preventDefault();
    this.setState({error:""})
  }
  changeUsername = (event) => {
    event.preventDefault();
    const user = this.props.user;
    console.log( "Hello " + user);
    API.getUser(this.state.username)
    .then(results => {
      if(results.data.length > 0){
        this.setState({error: "Username already exist. Please try another username", username: ""})
      }else{
        console.log( "Hello123 " + user);
        API.updateUser({
          newuser: this.state.username,
          olduser: user
        }).then(res =>{
          this.setState({error: "Username has been changed. Logout and Log back in for changes to take place.", username: ""})
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err));
  }

  changePassword = (event) => {
    event.preventDefault();
    const user = this.props.user;
    const newPassword = bcrypt.hashSync(this.state.password, 10)
    API.updatePassword({
      username: user,
      password: newPassword
    }).then(res => {
      this.setState({error: "Password has been changed. Logout and Log back in for changes to take place.", password: ""})
    }).catch(err => console.log(err));
    this.setState({error: ""})
  }

  logout(event) {
    event.preventDefault()
    console.log('logging out')
    axios.post('api/users/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        })
        window.location.href = "/";
      }
    }).catch(error => {
      console.log('Logout error')
    })
  }

  render() {
    const loggedIn = this.props.loggedIn;
    const user = this.props.user;
    return (
      <Wrapper>
        <div className="bg-pattern">
          <nav 
          id="nav-style"
          // style = {this.mystyle} 
          className="navbar navbar-dark">
            <div className="row w-100">
              <div className="col-sm-2">
          <img 
          height="100px"
          width="90px"
          src={okapi} 
          alt="okapi"/>
          </div>
          <div className="col-sm-7">
            <h1> <a 
            // style = {this.mystyle} 
            className="navbar-brand" 
            href="/">Macklist
            </a> </h1>
            </div>
            <div className="col-sm-3 text-right pt-4">
            {loggedIn ?
              <div id ="login-btn1">
                <div>
                    <span className="mr-2">Welcome {user}!</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
              </div>
              :
              <a href="/login" id ="login-btn" className="btn">Log In/Sign Up</a>}
              </div>
              </div>
          </nav>
          {loggedIn ?
            <div className="collapse" id="navbarToggleExternalContent">
              <div className="p-4 text-right">
                <a className="text-dark h4" href="/user-post">My Profile</a><br />
                <a className="text-dark h4" href="#" data-toggle="modal" data-target="#changeusername" onClick={this.clearError}>Change Username</a><br />
                <a className="text-dark h4" href="#" data-toggle="modal" data-target="#changepassword" onClick={this.clearError}>Change Password</a><br />
                <a href="/" className="text-dark h4" onClick={this.logout}>LogOut</a>
              </div>
            </div>
            : null}
        </div>


                {/* <!-- Change Username Modal --> */}
<div className="modal fade" id="changeusername" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Change Username</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <form onSubmit={this.changeUsername}>
                <p>{this.state.error}</p>
                    <Input
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        name="username"
                        type="text"
                        placeholder="Enter New Username"
                        pattern="[A-Za-z0-9]{6,}"
                        required
                        title="Username can only contain Uppercase, Lowercase or number and atleast 6 or more characters"
                    />
                    <button type="submit" className="btn btn-success mb-2" id="user-reset-btn">Change Username</button>
              <div>
              <FormBtn data-dismiss="modal" id="close-btn1">Close</FormBtn>
              </div>
                </form>
              </div>
            </div>
          </div>
        </div>


                       {/* <!-- Change Password Modal --> */}
<div className="modal fade" id="changepassword" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Change Password</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <form onSubmit={this.changePassword}>
                <p>{this.state.error}</p>
                    <Input
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        name="password"
                        type="password"
                        placeholder="Enter New Password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                        required
                    />
                    <button type="submit" className="btn btn-success mb-2" id="pw-reset-btn">Change Password</button>
              <div>
              <FormBtn data-dismiss="modal" id="close-btn">Close</FormBtn>
              </div>
                </form>
              </div>
            </div>
          </div>
        </div>


      </Wrapper>
    );
  }
}

export default Navbar;