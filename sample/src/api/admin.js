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

export const blockUser = async (userId)=>{
    try{
       const response = await Api.post(adminRoutes.blockUser,userId)
       return response
    }catch(error){
        return errorHandle(error)
    }
}

export const unBlockUser = async (userId)=>{
    try {
        const response = await Api.post(adminRoutes.unBlockUser,userId)
        return response
    } catch (error) {
        return errorHandle(error)
    }  
}

export const getRequests = async()=>{
    try {
        const response = await Api.get(adminRoutes.getRequests)
        return response
    } catch (error) {
        return errorHandle(error)
    }
}

export const approveRequests = async(reqId)=>{
    try {
        console.log(reqId);
        const response = await Api.post(adminRoutes.approveRequests,reqId)
        return response
    } catch (error) {
        return errorHandle(error)
    }
}

export const rejectRequests = async (reqId)=>{
    try {
        const response = await Api.post(adminRoutes.rejectRequests,reqId)
        return response
    } catch (error) {
        return errorHandle(error)
    }
}

export const getVerifiedkennelOwner = async()=>{
    try {
        const data = await Api.get(adminRoutes.getVerifiedkennelOwner)
        return data
    } catch (error) {
        return errorHandle(error)
    }
}

export const blockkennelowner = async (userId)=>{
    try{
       const response = await Api.post(adminRoutes.blockkennelowner,userId)
       return response
    }catch(error){
        return errorHandle(error)
    }
}

export const unblockkennelowner = async (userId)=>{
    try{
       const response = await Api.post(adminRoutes.unblockkennelowner,userId)
       return response
    }catch(error){
        return errorHandle(error)
    }
}
