import { InferActionsType } from './store-redux';
import { dialogsMessageType } from './../types/types'
const ADD_MESSAGE = 'dialogs-reducer/ADD-MESSAGE'
let initialeState ={
    dialogsData : [
        { id: 1, name: 'Nazar', src: "https://vjoy.cc/wp-content/uploads/2019/06/4-65.jpg"},
        { id: 2, name: 'Petro', src: "https://klike.net/uploads/posts/2019-03/1551512901_43.jpg"},
        { id: 3, name: 'Ivan', src: "https://proprikol.ru/wp-content/uploads/2019/07/prikolnye-kartinki-na-avu-6.jpg"},               
        { id: 4, name: 'Dmitro', src: "https://proprikol.ru/wp-content/uploads/2019/07/prikolnye-kartinki-na-avu-6.jpg"},
        { id: 5, name: 'Kolya', src: "https://proprikol.ru/wp-content/uploads/2019/07/prikolnye-kartinki-na-avu-6.jpg"}
    ] as Array<dialogsMessageType>,
    messages : [
        { id: 1, message:'How are you'},
        { id: 2, message:'It is good'},
        { id: 3, message:'Do not tell about this'},
    ] as Array<dialogsMessageType>,
    newMessageText:'' as string | null
}
type initialeStateType = typeof initialeState;
const dialogsReducer = (state=initialeState,action: ActionsType): initialeStateType => {
    switch(action.type){
        case ADD_MESSAGE:
            return {...state, messages:[...state.messages,{id: 4,message: action.newMessageText}]}
        default :
            return state
    }
}
export const action = {
    sendMessage: (newMessageText: string) =>
        {return {type:ADD_MESSAGE, newMessageText}}
}

    
type ActionsType = InferActionsType<typeof action>
export default dialogsReducer