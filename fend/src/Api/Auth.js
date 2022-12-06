import axios from "axios";

async function  loginAPI(data) {
    try {
        const response = await axios.post("http://10.20.114.22:8000/api/user/login",data)
        return response
    } catch (e){
        return {'success':false,'error':e}
    }
}
export {loginAPI}