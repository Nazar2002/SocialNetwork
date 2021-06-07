import { AppStateType } from './store-redux';
export const getUserAuth = (state:AppStateType)=>{
    return state.auth.isAuth
}
export const getUsersLogin = (state:AppStateType)=>{
    return state.auth.login
}