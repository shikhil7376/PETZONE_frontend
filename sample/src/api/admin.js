import Api from "@/services/axios";
import adminRoutes from "@/services/endpoints/adminEndPoints";
import errorHandle from "./error";



export const getUsers = async()=>{
    try {
        const response = await Api.get(adminRoutes.getUserDetails)
        return response
    } catch (error) {
        return errorHandle(error)
    }
}