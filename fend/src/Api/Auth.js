import axios from "axios";
let config = {

    headers: {
        
        'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
    }
}
async function  loginAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/auth/login",data)

        return response.data
    } catch (e){
        return {'success':false,'error':e}
    }
}
async function getUserAPI() {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/user/${sessionStorage.getItem("userId")}`,{
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
 
        const response = await axios.post("http://127.0.0.1:8000/api/v1/admin/user", data, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })


        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
} 

async function productLineAPI(data) {
    try {

        const response = await axios.post("http://127.0.0.1:8000/api/v1/admin/product-line", data, {
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })

   
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
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/user${localStorage.getItem("role")}`, {
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
async function getStorageDetailAPI() {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/storage${sessionStorage.getItem("user")}`,{
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
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/product${sessionStorage.getItem("user")}${sessionStorage.getItem("page")}`,{
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

async function exportProductAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/producer/export-to-agency", data,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }

}

async function createAgencyStorageAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/agency/storage", data,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function deleteUserAPI(id) {
    try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/v1/admin/user/${id}`,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function importProductAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/agency/import-new-product", data,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function getTransitionAPI() {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/product/status-transition?nextUserId=${sessionStorage.getItem("userId")}`,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function agencyImportAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/agency/import-new-product", data,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function handleCheckOutAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/agency/checkout", data,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}
async function getSoldProductAPI() {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/agency/product/sold`,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function receiveErrorProductAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/agency/receive-error-product", data,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function agencyToWarrantyAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/agency/transfer-error-product", data,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function warrantyCenterReceiceProductAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/warranty-center/receive-error-product", data,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function getProductErrorAPI(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/product/error?productId=${id}&solved=false`,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function getFixedDoneAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/warranty-center/verify-errors-fix-done", data,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}
async function returnToAgencyAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/warranty-center/return-fixed-product", data,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}
async function receiveProductAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/agency/receive-fixed-product", data,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function returnWarrantiedProductAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/agency/return-fixed-product", data,{
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        return response.data
    } catch(e) {
        return {'success':false,'error':e}
    }
}

async function returnNewProductAPI(data) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/v1/agency/return-new-product", data,{
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
        createProducerStorageAPI, getStorageDetailAPI, createProductAPI, getAllProductAPI, getProductDetailAPI,
        exportProductAPI, createAgencyStorageAPI, deleteUserAPI, importProductAPI, getTransitionAPI, agencyImportAPI,
        handleCheckOutAPI, getSoldProductAPI, receiveErrorProductAPI, agencyToWarrantyAPI, warrantyCenterReceiceProductAPI,
        getProductErrorAPI, getFixedDoneAPI, returnToAgencyAPI, receiveProductAPI, returnWarrantiedProductAPI, returnNewProductAPI
    }
