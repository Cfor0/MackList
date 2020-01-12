import axios from "axios";

export default {
    getUser: function (UserData) {
        return axios.get("/api/users/"+ UserData);
    },
    getEmail: function (UserData) {
        return axios.get("/api/users/email/"+ UserData);
    },
    loginUser: function (UserData) {
       
        return axios.get("/api/users/login/"+ UserData[0].username + "/" + UserData[0].password);
    },
    signupUser: function (UserData) {
        return axios.post("/api/users", UserData);
    },
    updateUser: function (UserData){
        return axios.put("/api/users/updateUser/" + UserData.olduser + "/" + UserData.newuser)
    },
    updatePassword: function(UserData){
      
        return axios.put("/api/users/updatePassword/" + UserData.username + "/" + UserData.password)
    },
    forgotPassword: function(UserData){
        //console.log(UserData)
        return axios.post("/api/users/forgotPassword", UserData)
    },
    postAd: function(UserData){
      
        return axios.post("/api/ads", UserData)
    },
    getAd: function(UserData){
      
        return axios.get("/api/ads", UserData)
    },
    lowtohigh: function(UserData){
        return axios.put("/api/ads/lowTohigh",UserData)
    },
    hightolow: function(UserData){
        return axios.put("/api/ads/highTolow",UserData)
    },
    searchItem: function(UserData){
      
        return axios.put("/api/ads/search",UserData)
    },
    getAdById: function(UserData){
     
        return axios.get("/api/ads/" + UserData.id)
    },
    deletebyID: function(UserData){
        return axios.delete("/api/ads/"+ UserData.id)
    },
    updateAd: function(UserData){
      
        return axios.put("/api/ads", UserData)
    }
}