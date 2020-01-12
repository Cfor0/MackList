import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import User from "./pages/user";
import Login from "./pages/logIn"
import Signup from "./pages/signUp"
import ForgotPassword from "./pages/forgotPassword"
import Navbar from "./components/Navbar"
import axios from "axios"
import UserPost from "./pages/user-post";

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      adImage:""
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }


  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/api/users/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

render() {
  return (
<div className="App">
    <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} user={this.state.username}/>
       
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user" component={User} />
          <Route exact path="/login" render={() =>
            <Login
              updateUser={this.updateUser}
            />}/>
          <Route exact path="/user-post" render={() =>
          <UserPost
          user = {this.state.username}
          loggedIn = {this.state.loggedIn}
          />} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
        </Switch>
        </div>
        </Router>
      </div>

    );
  }
}

export default App;
