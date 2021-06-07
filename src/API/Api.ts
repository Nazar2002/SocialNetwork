import axios from "axios"

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "0253c158-5981-444e-adfd-c20aa3cdc9e3"
    }
})
export enum ResultCode{
    success = 0,
    error = 1,
    captcha = 10
}
export type ResponseType = {
    data:{},
    resultCode: ResultCode
    messages: Array<string>
}


