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