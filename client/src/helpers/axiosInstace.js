import axios from "axios";


 
//Creating an axios instance and confi jwt token
 const instance  = axios.create({
    baseURL:'http://localhost:5000'
    // baseURL: process.env.REACT_APP_BASE_URL
})

// let AUTH_TOKEN = localStorage.getItem('userToken')
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN; 

export default instance