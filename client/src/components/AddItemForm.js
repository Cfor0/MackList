import React, { Component } from "react";
import { Input, TextArea, FormBtn } from "../components/input";
import API from "../utils/API"
import { CitiesAndState } from "../utils/cityState"
import { Department } from "../utils/department"
import Axios from "axios";

class Form extends Component {
  
  // Setting the component's initial state
  state = {
    owner: "",
    productTitle: "",
    productImage: "",
    productDescription: "",
    productDepartment: "",
    productCost: "",

    locationCity: "",
    locationState: "",

    sellerContactName: "",
    sellerContactPhone: "",
    sellerContactEmail: "",
    message: "",

    cities: []
    
  };

  updateCities = () => {
    const arr = CitiesAndState.filter(ele => {
      return ele.state === this.state.locationState
    })
    var arr1 = []
    arr.map(ele => {
      console.log(ele)
      for (let i = 0; i < ele.cities.length; i++) {
        arr1.push(ele.cities[i])
      }
    })
    this.setState({ cities: arr1 })
  }

  handleInputChange = event => {

    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    this.setState({
      [name]: value 
    });
    
  };

  handleFileChange = event => {
    // const { name, files } = event.target;
    this.setState({
      productImage: event.target.files[0] 
    });
    console.log(event.target.files[0]);
  };
  handleFormSubmit = event => {

    // Preventing the default behavior of the form submit (which is to refresh the page)
    
    event.preventDefault();

   
    API.postAd({
      owner: this.props.user,
      productTitle: this.state.productTitle,
      productImage: this.state.productImage,
      productDescription: this.state.productDescription,
      productDepartment: this.state.productDepartment,
      productCost: this.state.productCost,

      locationCity: this.state.locationCity,
      locationState: this.state.locationState,

      sellerContactName: this.state.sellerContactName,
      sellerContactPhone: this.state.sellerContactPhone,
      sellerContactEmail: this.state.sellerContactEmail,
    }).then(results => {
      this.setState({
        productTitle: "",
        productImage: "",
        productDescription: "",
        productCost: "",

        locationCity: "",
        locationState: "",

        sellerContactName: "",
        sellerContactPhone: "",
        sellerContactEmail: "",
        message: "Item added Successfully"
      });
    }).catch(err => console.log(err));


  };

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    const user = this.props.user;
    return (
      <div>
        <form className="form" onSubmit={this.handleFormSubmit}>
          <h3>Ad posted by: {user}</h3>

          <label>Title (required)</label>
          <Input
            value={this.state.productTitle || this.props.title}
            name="productTitle"
            onChange={this.handleInputChange}
            type="text"
            required
            maxlength = "30"
            placeholder="Product Title"
          />
          <label>Image (required)</label>
          <Input
            name="productImage"
            onChange={this.handleInputChange}
            type="text"
            required
            placeholder="Product Image"
          />
          <label>Description (required)</label>
          <TextArea
            value={this.state.productDescription || this.props.description}
            name="productDescription"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Product Description"
            required
          />
          <label>Department (required)</label>
          <Input
            value={this.state.productDepartment || this.props.department}
            name="productDepartment"
            list="department"
            onChange={this.handleInputChange}
            type="text"
            required
            placeholder="Department"
          />

          <datalist id="department">
            {Department.map(ele => {
              //  console.log(ele)
              return <option>{ele.department}</option>
            })}
          </datalist>
          <label>Price (required)</label>
          <Input
            value={this.state.productCost || this.props.cost}
            name="productCost"
            onChange={this.handleInputChange}
            type="text"
            pattern="[0-9.]{1,}"
            placeholder="Price"
            required
            title="Please enter numeric value"
          />
          <label>State (required)</label>
          <Input
            value={this.state.locationState || this.props.state}
            name="locationState"
            list="state"
            onChange={this.handleInputChange}
            type="text"
            required
            placeholder="State"
          />

          <datalist id="state">
            {CitiesAndState.map(ele => {
              //  console.log(ele)
              return <option>{ele.state}</option>
            })}
          </datalist>

          <label>City (required)</label>
          <Input
            value={this.state.locationCity || this.props.city}
            name="locationCity"
            list="city"
            onChange={this.handleInputChange}
            onFocus={this.updateCities}
            type="text"
            placeholder="City"
            required
          />
          <datalist id="city">
            {this.state.cities.map(ele => {
              // console.log(ele)

              return <option>{ele}</option>

            })}
          </datalist>

          <label>Contact Name (required)</label>
          <Input
            value={this.state.sellerContactName || this.props.name}
            name="sellerContactName"
            onChange={this.handleInputChange}
            type="text"
            required
            placeholder="Contact Name"
          />
          <label>Contact Email (required)</label>
          <Input
            value={this.state.sellerContactEmail || this.props.email}
            name="sellerContactEmail"
            required
            onChange={this.handleInputChange}
            type="email"
            placeholder="Email"
          />
          <label>Contact Phone</label>
          <Input
            value={this.state.sellerContactPhone || this.props.phone}
            name="sellerContactPhone"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Contact Phone"
            pattern="[0-9]{1,}"
            title="Please enter numeric value"
          />

          <button type="submit" className="btn btn-success" id="login-page-btn">Submit</button>
          <p className="text-success">{this.state.message}</p>
        </form>
      </div>
    );
  }
}
export default Form;














