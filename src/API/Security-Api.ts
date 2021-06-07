import { instance,ResultCode } from './Api'
type getCaptchaUrlType = {
    url:string
    resultCode: ResultCode
    messages: Array<string>
}
export const securityAPI = {
    getCaptchaUrl(){
        return instance.get<getCaptchaUrlType>(`security/get-captcha-url`)
            .then(response => {return response.data})
    },
}