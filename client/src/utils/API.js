import axios from "axios";

export default {
    getUser: function (UserData) {
        return axios.get("/api/users/"+ UserData);
    },
    getEmail: function (UserData) {
        return axios.get("/api/users/email/"+ UserData);
    },
    loginUser: function (UserData) {
        console.log(UserData[0].password)
        return axios.get("/api/users/login/"+ UserData[0].username + "/" + UserData[0].password);
    },
    signupUser: function (UserData) {
        return axios.post("/api/users", UserData);
    },
    updateUser: function (UserData){
        return axios.put("/api/users/updateUser/" + UserData.olduser + "/" + UserData.newuser)
    },
    updatePassword: function(UserData){
        console.log(UserData)
        return axios.put("/api/users/updatePassword/" + UserData.username + "/" + UserData.password)
    }
}