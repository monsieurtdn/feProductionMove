import axios from "axios";
let config = {

    headers: {
        
        'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
    }
}
async function  loginAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/auth/login",data)
        console.log(response.data)
        return response.data
    } catch (e){
        return {'success':false,'error':e}
    }
}
async function getUserAPI() {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/user/${localStorage.getItem("userId")}`,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}
async function registerAPI(data) {
    try {
        console.log(config)
        const response = await axios.post("http://127.0.0.1:8000/api/v1/admin/user", data, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })

        console.log(response.data);
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
} 

async function productLineAPI(data) {
    try {
        console.log(config)
        const response = await axios.post("http://127.0.0.1:8000/api/v1/admin/product-line", data, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })

        console.log(response.data);
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function updateUserInfoAPI(data) {
    try {
        const response = await axios.patch(`http://127.0.0.1:8000/api/v1/user/${localStorage.getItem("userId")}`, data, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        console.log(response.data)
    } catch(e) {
        return {'success':false, 'error':e}
        }
    }
 
async function getAllProductLineAPI() {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/product/product-line",{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}
async function getAllAccountAPI() {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/user",{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}
async function createProducerStorageAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/producer/storage", data,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}
async function getAllProducerStorageAPI() {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/producer/storage",{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function createProductAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/producer/product", data,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function getAllProductAPI() {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/product",{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function getProductDetailAPI(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/product/${id}`,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}


export { loginAPI, getUserAPI,registerAPI,productLineAPI,updateUserInfoAPI,getAllProductLineAPI, getAllAccountAPI,
        createProducerStorageAPI, getAllProducerStorageAPI, createProductAPI, getAllProductAPI, getProductDetailAPI}
