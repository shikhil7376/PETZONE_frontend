import Api from "@/services/axios";
import errorHandle from "./error";
import userRoutes from "@/services/endpoints/userEndPoints";

export const signup = async(userData)=>{
    try {
        const response = await Api.post(userRoutes.signup,userData)
        return response
    } catch (error) {
        const err = error
        return errorHandle(err)
    }
}

export const otpVerify = async(otp,email)=>{
    try {
       const response = await Api.post(userRoutes.userOtpVerify,{...otp,...email})
       return response   
    } catch (error) {
        return errorHandle(error)
    }
}

export const login = async(userData)=>{
    try {
        const response = await Api.post(userRoutes.userLogin,userData)
        return response
    } catch (error) {
        return errorHandle(error)
    }
}

export const resendOtp = async(userData)=>{
    try {
        const response = await Api.post(userRoutes.resendotp,userData)
        return response
    } catch (error) {
        return errorHandle(error)
    }
}

export const forgotPassword = async(email)=>{
     try {
        const response = await Api.post(userRoutes.forgotpassword,{email})
        return response
     } catch (error) {
        return errorHandle(error)
     }
}

export const forgotPasswordOtp = async(otp,email)=>{
    try {
        const response = await Api.post(userRoutes.verifyforgototp,{...otp,...email})
        return response
    } catch (error) {
        return errorHandle(error)
    }
}

export const resentforgototp = async(email)=>{
    console.log(email);
    try {
      const response = await Api.post(userRoutes.verifyforgotresendotp,email)
      return response
    } catch (error) {
        return errorHandle(error)
    }
}

export const resetpassword = async(data)=>{
    try {
        const response = await Api.post(userRoutes.resetpassword,data)
        return response
    } catch (error) {
        return errorHandle(error)
    }
}