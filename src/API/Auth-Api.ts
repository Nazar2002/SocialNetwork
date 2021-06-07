import { instance, ResultCode, ResponseType } from './Api';
type ResponseDataType<Data> = {
    data:Data,
    resultCode: ResultCode
    messages: Array<string>
}
type LoginUserType= {
    id: number
    email: string
    login: string
}
type LoginPostType = {
    resultCode: ResultCode
    userId: number
}
export const authAPI = {
    loginUser(){
        return instance.get<ResponseDataType<LoginUserType>>(`auth/me`)
            .then(response =>{return response.data})
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null){
        return instance.post<ResponseType>(`auth/login`,{email,password,rememberMe,captcha})
            .then(response => {return response.data})
    },
    logout(){
        return instance.delete<ResponseType>(`auth/login`)
            .then(response => {return response.data})
    }
}