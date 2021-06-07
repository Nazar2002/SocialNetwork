import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';

let store = {
    _callSubscribes(){
        console.log('sads')
    },
    _state : {
        profilePage:{
            postData : [
                { id: 1, message:'Hi'},
                { id: 2, message:'How are you?'},
              ],
           newPostText:''
        },
        dialogsPage:{
            dialogsData : [
                { id: 1, name: 'Nazar', src: "https://vjoy.cc/wp-content/uploads/2019/06/4-65.jpg"},
                { id: 2, name: 'Petro', src: "https://klike.net/uploads/posts/2019-03/1551512901_43.jpg"},
                { id: 3, name: 'Ivan', src: "https://proprikol.ru/wp-content/uploads/2019/07/prikolnye-kartinki-na-avu-6.jpg"},               
                { id: 4, name: 'Dmitro', src: "https://proprikol.ru/wp-content/uploads/2019/07/prikolnye-kartinki-na-avu-6.jpg"},
                { id: 5, name: 'Dmitro', src: "https://proprikol.ru/wp-content/uploads/2019/07/prikolnye-kartinki-na-avu-6.jpg"}

            ],
            messages : [
                { id: 1, message:'How are you'},
                { id: 2, message:'It is good'},
                { id: 3, message:'Do not tell about this'},
                
            ],
            newMessageText:''
        },
    },
    getState(){
        return this._state;
    },
    subscribe (observer){
        this._callSubscribes = observer;
    },
    dispatch(action){
        this._state.profilePage = profileReducer(this._state.profilePage,action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage,action);
        this._callSubscribes(this._state);
    }
};



   



export default store;