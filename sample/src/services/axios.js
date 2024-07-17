import errorHandle from "@/api/error";
import axios from "axios";


const BASE_URL ='http://localhost:8000/api'

const Api = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})

Api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response){
            return errorHandle(error)
        }else {
            console.log('axios error:',error);
        }
        return Promise.reject(error)
    }
)

Api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token')
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error)=>{
        console.log('request error',error);
        return Promise.reject(error)
    }
    
)

export default Api