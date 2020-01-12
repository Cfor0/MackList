import React, { Component } from "react";
import Axios from "axios";
import ShowAds from "./ShowAds"
import { CitiesAndState } from "../utils/cityState"
import { Department } from "../utils/department"
import API from "../utils/API"
import { AdCard } from "../components/ad/index";
import Wrapper from "../components/Wrapper";

const styles = {
    search: {
        "height": "480px",
        "border": "1px solid black",
    },
    width: {
        "width": "100%",
        "font-size": "20px"
    },

}
class Sidebar extends Component {
    state = {
        cities: [],
        locationCity: "",
        locationState: "",
        department: "",
        allposts: [],
        onepost: [],
        id: [],
        sort: 0
    }
    componentDidMount = () => {
        API.getAd({})
            .then(results => {
                this.setState({ allposts: results.data })
                })
            .catch(err => console.log(err))
    }
    clicked = (id) => {

        API.getAdById({ id })
            .then(results => {
                console.log(results)
                this.setState({ onepost: results.data })
            })
            .catch(err => console.log(err))

    }
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
        console.log(this.state.cities)
    }
    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });

    };
    filteredSearch = () => {
        if (this.state.sort === 1) {
            this.lowTohigh()
        }
        else if (this.state.sort === -1) {
            this.highTolow()
        } else {
            if (this.state.locationCity && this.state.locationState && this.state.department) {
                API.searchItem({
                    locationCity: this.state.locationCity
                }, { locationState: this.state.locationState }, {
                    productDepartment: this.state.department
                }).then(results => {
                    this.setState({ allposts: results.data })
                })
                    .catch(err => console.log(err))
            } else if (this.state.locationState && this.state.department) {
                API.searchItem({
                    locationState: this.state.locationState, productDepartment: this.state.department
                }).then(results => {
                    this.setState({ allposts: results.data })
                })
                    .catch(err => console.log(err))
            } else if (this.state.locationState && this.state.locationCity) {
                API.searchItem({
                    locationState: this.state.locationState, locationCity: this.state.locationCity
                }).then(results => {
                    this.setState({ allposts: results.data })
                })
                    .catch(err => console.log(err))
            } else if (this.state.locationState) {
                API.searchItem({
                    locationState: this.state.locationState
                }).then(results => {
                    this.setState({ allposts: results.data })
                })
                    .catch(err => console.log(err))
            } else if (this.state.department) {
                API.searchItem({
                    productDepartment: this.state.department
                }).then(results => {
                    this.setState({ allposts: results.data })
                })
                    .catch(err => console.log(err))
            }
        }
    }
    lowTohigh = () => {
        this.setState({ sort: 1 })
        console.log("test")
        if (this.state.locationCity && this.state.locationState && this.state.department) {
            API.lowtohigh({
                locationCity: this.state.locationCity
            }, { locationState: this.state.locationState }, {
                productDepartment: this.state.department
            }).then(results => {
                this.setState({ allposts: results.data })
            })
                .catch(err => console.log(err))
        } else if (this.state.locationState && this.state.department) {
            API.lowtohigh({
                locationState: this.state.locationState, productDepartment: this.state.department
            }).then(results => {
                this.setState({ allposts: results.data })
            })
                .catch(err => console.log(err))
        } else if (this.state.locationState && this.state.locationCity) {
            API.lowtohigh({
                locationState: this.state.locationState, locationCity: this.state.locationCity
            }).then(results => {
                this.setState({ allposts: results.data })
            })
                .catch(err => console.log(err))
        } else if (this.state.locationState) {
            API.lowtohigh({
                locationState: this.state.locationState
            }).then(results => {
                this.setState({ allposts: results.data })
            })
                .catch(err => console.log(err))
        } else if (this.state.department) {
            API.lowtohigh({
                productDepartment: this.state.department
            }).then(results => {
                this.setState({ allposts: results.data })
            })
                .catch(err => console.log(err))
        } else {
            API.lowtohigh({})
                .then(response => {
                    console.log(response)
                    this.setState({ allposts: response.data })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    highTolow = () => {
        this.setState({ sort: -1 })
        console.log("test")
        if (this.state.locationCity && this.state.locationState && this.state.department) {
            API.hightolow({
                locationCity: this.state.locationCity
            }, { locationState: this.state.locationState }, {
                productDepartment: this.state.department
            }).then(results => {
                this.setState({ allposts: results.data })
            })
                .catch(err => console.log(err))
        } else if (this.state.locationState && this.state.department) {
            API.hightolow({
                locationState: this.state.locationState, productDepartment: this.state.department
            }).then(results => {
                this.setState({ allposts: results.data })
            })
                .catch(err => console.log(err))
        } else if (this.state.locationState && this.state.locationCity) {
            API.hightolow({
                locationState: this.state.locationState, locationCity: this.state.locationCity
            }).then(results => {
                this.setState({ allposts: results.data })
            })
                .catch(err => console.log(err))
        } else if (this.state.locationState) {
            API.hightolow({
                locationState: this.state.locationState
            }).then(results => {
                this.setState({ allposts: results.data })
            })
                .catch(err => console.log(err))
        } else if (this.state.department) {
            API.hightolow({
                productDepartment: this.state.department
            }).then(results => {
                this.setState({ allposts: results.data })
            })
                .catch(err => console.log(err))
        } else {
            API.hightolow({})
                .then(response => {
                    console.log(response)
                    this.setState({ allposts: response.data })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    render() {
        return (
            <Wrapper>
                <div className="row">
                    <div className="col-sm-12">
                        <nav className="nav flex-column bg-light" >
                            <div className="btn btn-dark" id="login-page-btn" role="button" style={styles.width}>
                                Search </div> </nav></div>

                    <div className="card-body row ml-3 bg-dark text-white">
                        <div className="form-group col-lg-3">
                            <label htmlFor="FormControlSelect">Department</label>
                            <input
                                type="text"
                                value={this.state.department}
                                name="department"
                                onChange={this.handleInputChange}
                                onSelect={this.filteredSearch}
                                placeholder=" Select Department"
                                list="department" className="form-control">
                            </input>
                            <datalist id="department">
                                {Department.map(ele => {
                                    
                                    return <option key={ele.department}>{ele.department}</option>
                                })}
                            </datalist>
                        </div>
                        <div className="form-group col-lg-3">
                            <label htmlFor="FormControlSelect">State(required)</label>
                            <input
                                type="text"
                                value={this.state.locationState}
                                name="locationState"
                                onChange={this.handleInputChange}
                                onSelect={this.filteredSearch}
                                placeholder=" Select State"
                                required
                                list="state" className="form-control">
                            </input>
                            <datalist id="state">
                                {CitiesAndState.map(ele => {
                                
                                    return <option key={ele.state}>{ele.state}</option>
                                })}
                            </datalist>
                        </div>
                        <div className="form-group col-lg-3">
                            <label htmlFor="FormControlSelect">City</label>
                            <input
                                type="text"
                                value={this.state.locationCity}
                                name="locationCity"
                                onChange={this.handleInputChange}
                                onSelect={this.filteredSearch}
                                onFocus={this.updateCities}
                                placeholder=" Select City"
                                required
                                list="city" className="form-control">
                            </input>
                            <datalist id="city">
                                {this.state.cities.map(ele => {
                                    
                                    return <option key={ele}>{ele}</option>
                                })}
                            </datalist>
                        </div>
                        <div className="col-lg-2">
                            <div className="row">
                                <label className="col-lg-12">Filter by Price</label>
                            </div>
                            <div className="row">
                                <div className="form-check col-lg-6">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" onClick={this.lowTohigh}></input>
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        <a className="text-white font-italic">Low-High</a>
                                    </label>
                                </div>
                                <div className="form-check col-lg-6">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" onClick={this.highTolow}></input>
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        <a className="text-white font-italic">High-Low</a>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="col-lg-9">
                    <ShowAds />
                </div> */}
                </div>
                {this.state.allposts.map(ele => {
                    // console.log(ele);
                    return <AdCard
                        name={ele.productTitle}
                        price={" $" + ele.productCost}
                        image={ele.productImage}
                        onClick={e => this.clicked(ele._id)}
                        data-toggle="modal"
                        data-target="#exampleModalLong"
                        key={ele.productTitle}
                    />
                })}

                <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4>Product detail</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                {this.state.onepost.map(ele => {
                                    return (
                                        <div>
                                            <div className="text-center" >
                                                <img src={ele.productImage} alt={ele.productTitle} height="250px" width="350px" /></div>
                                            <p><b>Title:</b> {ele.productTitle}</p>
                                            <p><b>Description:</b> {ele.productDescription}</p>
                                            <p><b>City:</b> {ele.locationCity}</p>
                                            <p><b>State:</b> {ele.locationState}</p>
                                            <p><b>Contact Person:</b> {ele.sellerContactName}</p>
                                            <p><b>Phone:</b> {ele.sellerContactPhone}</p>
                                            <p><b>Email:</b> {ele.sellerContactEmail}</p>

                                        </div>
                                    )
                                })}

                                <button type="button" id="modal-submit-btn" className="btn btn-success" data-dismiss="modal" data-target="#exampleModalLong">
                                    Close</button></div>
                            {/* // <Form user={user} /> */}
                        </div>
                    </div>
                </div>

            </Wrapper>
        )
    }
}
export default Sidebar;