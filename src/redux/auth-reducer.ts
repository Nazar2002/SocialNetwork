import { securityAPI } from './../API/Security-Api';
import { authAPI } from './../API/Auth-Api';
import { ResultCode } from './../API/Api'
import { AppStateType, InferActionsType } from './store-redux'
import { ThunkAction } from "redux-thunk"


const SET_USER_DATA = 'auth-reducer/SET_USER_DATA'
const GET_CAPTCHA_SUCCESS = 'auth-reducer/GET_CAPTCHA_SUCCESS'
type initialeStateType ={
    id: number | null
    email: string | null
    login: string | null
    isAuth : boolean
    captchaUrl : string | null
}
let initialeState: initialeStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}
const authReducer =(state = initialeState, action: ActionsType): initialeStateType => {
    switch(action.type){
        case SET_USER_DATA :
            return{...state, ...action.payload}
        case GET_CAPTCHA_SUCCESS :
            return{...state, ...action.payload}
        default :
            return state
    }
}
const action = {
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => 
        {return{type: SET_USER_DATA, payload: {id, email, login, isAuth}} as const},
    getCaptchaUrlSuccess: (captchaUrl: string) =>
        {return{type: GET_CAPTCHA_SUCCESS,payload: {captchaUrl}} as const}
}


type ActionsType = InferActionsType<typeof action>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const loginUser = (): ThunkType=> {
    return async(dispatch) => {
        let data = await authAPI.loginUser()   
        if(data.resultCode === ResultCode.success){
            let {id,email,login} = data.data
            dispatch(action.setUserData(id,email,login,true))
        }
    }
}
export const login = (email: string,password: string,rememberMe: boolean,captcha: string|null): ThunkType=>{
    return async(dispatch) => {
        const data = await authAPI.login(email,password,rememberMe,captcha)
        if(data.resultCode === ResultCode.success){
            dispatch(loginUser())
        }else{
            dispatch(getCaptchaUrl())
        }
    }
}
export const getCaptchaUrl =(): ThunkType=>{
    return async(dispatch) => {
        let data = await securityAPI.getCaptchaUrl()
        const captchaUrl = data.url
        dispatch(action.getCaptchaUrlSuccess(captchaUrl))
    }
}
export const logout = (): ThunkType=>{
    return async(dispatch) => {
        let data = await authAPI.logout()
        if(data.resultCode === ResultCode.success){
            dispatch(action.setUserData(null,null,null,false))
        }

    }
}

export default authReducer