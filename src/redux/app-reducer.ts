import { AppStateType, InferActionsType } from './store-redux'
import { ThunkAction } from "redux-thunk"
import { loginUser } from "./auth-reducer"
const SET_INITIALISED = 'app-reducer/SET_INITIALISED'
export type initialeStateType = {
    initialised: boolean | null
}
const initialeState: initialeStateType = {
    initialised : false
}
const appReducer  = (state=initialeState,action: ActionsType): initialeStateType => {
    switch(action.type){
        case SET_INITIALISED :
            return {...state, initialised: true}
        default:
            return state
    }
}
const action = {
   setInitialisedSuccess: () =>{return{type: SET_INITIALISED} as const} 
}

type ActionsType =InferActionsType<typeof action>
type ThunkType= ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const initialisedApp = () =>{
    return (dispatch: any) => {
        let promise = dispatch(loginUser())
        Promise.all([promise]).then(()=>{
            dispatch(action.setInitialisedSuccess)
        })
    }
}
export default appReducer