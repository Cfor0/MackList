import React, { Component } from "react";
import Navbar from '../components/Navbar';
import Wrapper from "../components/Wrapper";
import axios from "axios"
import Sidebar from "../components/Sidebar"
import AdCard from "../components/ad/index";
import API from "../utils/API"

const styles = {
  page: {
    "overflow-x": "hidden"
  }
}

class Home extends Component {

  render() {
    return (
      <Wrapper style = {styles.page}>
        <Sidebar className="fixed-top" />
       </Wrapper> 
)}
    }

export default Home;
