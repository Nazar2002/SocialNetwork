import { chatMessageType, ChatApi, StatusType } from './../API/Chat-Api';
import { AppStateType, InferActionsType } from './store-redux'
import { ThunkAction } from "redux-thunk"
import { Dispatch } from 'redux';




const GET_MESSAGES = 'chat-reduce/GET_MESSAGES'
const STATUS_CHANGED = 'chat-reduce/STATUS_CHANGED'


let initialeState = {
    messages:[] as chatMessageType[],
    status: 'pending' as StatusType
}
type initialeStateType = typeof initialeState;
const chatReducer =(state = initialeState, action: ActionsType):initialeStateType => {
    switch(action.type){
        case GET_MESSAGES :
            return{
                ...state, 
                messages:[...state.messages,...action.payload.messages]
            }
        case STATUS_CHANGED :
            return{
                ...state,
                status: action.payload.status
            }
        default :
            return state
    }
}
const action = {
    getMessages: (messages:chatMessageType[]) => {
        return{type: GET_MESSAGES, payload: {messages}} as const
    },
    statusChanged:(status:StatusType)=>{
        return{type:STATUS_CHANGED,payload: {status}}as const
    }
}


type ActionsType = InferActionsType<typeof action>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
let _newMessageHandler: ((messages: chatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(action.getMessages(messages))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(action.statusChanged(status))
        }
    }
    return _statusChangedHandler
}
export const startMessageListening = (): ThunkType=> {
    return async(dispatch) => {
        ChatApi.start()
        ChatApi.subscribe('messages-received', newMessageHandlerCreator(dispatch))
        ChatApi.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
    }
}
export const stopMessageListening = (): ThunkType=> {
    return async(dispatch) => {
        ChatApi.stop()
        ChatApi.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
        ChatApi.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    }
}
export const sendMessage = (message:string): ThunkType => {
    return async(dispatch)=>{
        ChatApi.sendMessage(message)
    }
}


export default chatReducer