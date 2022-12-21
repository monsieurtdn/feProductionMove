import axios from "axios";
let config = {
    headers: {
        'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
    }
}
async function  loginAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:3000/api/v1/auth/login",data)
        console.log(response.data)
        return response.data
    } catch (e){
        return {'success':false,'error':e}
    }
}
async function getUserAPI() {
    try {
        const response = await axios.get(`http://127.0.0.1:3000/api/v1/user/${localStorage.getItem("userId")}`,config)
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}
export {loginAPI, getUserAPI}
