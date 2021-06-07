import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import usersReducer from "./users-reducer"
import authReducer from "./auth-reducer"
import thunk from "redux-thunk"
import appReducer from "./app-reducer"
import chatReducer from "./chat-reducer"
let RootReducers = combineReducers({
        profilePage:profileReducer,
        dialogsPage:dialogsReducer,
        usersPage:usersReducer,
        auth:authReducer,
        chat:chatReducer,
        app:appReducer
});

export type AppStateType = ReturnType<typeof RootReducers>

type PropertiesTypes<T> = T extends {[key: string]:infer U}? U: never
export type InferActionsType<T extends {[key: string]:(...args:any[])=>any}> = ReturnType<PropertiesTypes<T>> 
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(RootReducers, composeEnhancers(applyMiddleware(thunk)))


export default store