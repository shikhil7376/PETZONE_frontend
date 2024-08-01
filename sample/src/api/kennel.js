import Api from "@/services/axios";
import errorHandle from "./error";
import kennelRoutes from "@/services/endpoints/kennelEndPoints";

export const signup = async(userData)=>{
    try {
        const response = await Api.post(kennelRoutes.signup,userData)
        return response
    } catch (error) {
        return errorHandle(error)
    }
}


export const otpVerify = async(otp,email)=>{
    try {
       const response = await Api.post(kennelRoutes.userOtpVerify,{...otp,...email})
       return response   
    } catch (error) {
        return errorHandle(error)
    }
}

export const login = async(userData)=>{
    try {
        const response = await Api.post(kennelRoutes.verifiedlogin,userData)
        return response
    } catch (error) {
        return errorHandle(error)
    }
}

export const resendOtp = async(userData)=>{
    try {
        const response = await Api.post(kennelRoutes.resendotp,userData)
        return response
    } catch (error) {
        return errorHandle(error)
    }
}

export const getProfile = async(Id)=>{
    try {
    const response = await Api.post(kennelRoutes.getProfile,{Id:Id}) 
      return response 
    } catch (error) {
        return errorHandle(error)
    }
}

export const addCages = async(data)=>{
    try{
       const response = await Api.post(kennelRoutes.addCages,data)
    }catch(error){
        return errorHandle(error)
    }
}

export const getCage = async()=>{
    try {
        const response = await Api.get(kennelRoutes.getCages)
                return response
    } catch (error) {
        
    }
}