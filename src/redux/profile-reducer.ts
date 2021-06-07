
import { ResultCode } from './../API/Api';
import { AppStateType, InferActionsType } from './store-redux'
import { photosType, postDataType, profileType } from './../types/types'
import { ThunkAction } from 'redux-thunk'
import { profileAPI } from '../API/Profile-Api';

const ADD_POST = 'profile-reducer/ADD_POST'
const SET_USER_PROFILE = 'profile-reducer/SET_USER_PROFILE'
const SET_STATUS = 'profile-reducer/SET_STATUS'
const DELETE_POST = 'profile-reducer/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profile-reducer/SAVE_PHOTO_SUCCESS'

let initialeState = {
    postData : [
        { id: 1, message:'Hi'},
        { id: 2, message:'How are you?'},
    ] as Array<postDataType>,
    profile:null as profileType | null,
    status:'' as string,
    newPostText:'' as string
}
type initialeStateType = typeof initialeState
const profileReducer = (state=initialeState,action: ActionsType): initialeStateType => {
    switch(action.type){
        case ADD_POST : 
            return {...state, postData:[...state.postData,{id: 5,message: action.newPostText}]}
        case SET_USER_PROFILE :
            return {...state, profile: action.profile}
        case SET_STATUS :
            return {...state,status: action.status}
        case DELETE_POST:
            return {...state,postData: state.postData.filter(post => post.id !=action.postId)}
        case SAVE_PHOTO_SUCCESS:
                return {...state, profile:{...state.profile, photos: action.photos} as profileType}
        default :
            return state
    }
}

export const action = {
    addPost : (newPostText: string) => {return {type: ADD_POST, newPostText}as const},
    deletePost :(postId: number) => {return{type: DELETE_POST, postId}as const},
    setUserProfile : (profile: profileType) => {return {type: SET_USER_PROFILE, profile}as const},
    setStatus : (status: string) => {return {type: SET_STATUS,status}as const},
    savePhotoSuccess : (photos: photosType) => {return {type: SAVE_PHOTO_SUCCESS, photos}as const}
}


type ActionsType = InferActionsType<typeof action>
type ThunkType = ThunkAction<Promise<void>,AppStateType,unknown,ActionsType>
export const profileUser = (userId: number): ThunkType=> {
    return async(dispatch) => {
        let data = await profileAPI.profileUser(userId)          
        dispatch(action.setUserProfile(data))
    }
}
export const getStatus = (userId: number): ThunkType=> {
    return async(dispatch) => {
        let data = await profileAPI.getStatus(userId)
        dispatch(action.setStatus(data))
    }
}
export const updateStatus = (status: string): ThunkType=> {
    return async(dispatch) => {
        let data = await profileAPI.updateStatus(status)
        if(data.resultCode === ResultCode.success){
            dispatch(action.setStatus(status))
        }
    }
}
export const savePhoto = (file: string): ThunkType=> {
    return async(dispatch) => {
        let data = await profileAPI.savePhoto(file)
        if(data.resultCode === ResultCode.success){
            dispatch(action.savePhotoSuccess(data.data.photos))
        }
    }
}
export const saveProfileData = (profile: profileType): ThunkType=> {
    return async(dispatch, getState: any) => {
        const userId = getState().auth.id;
        let data = await profileAPI.saveProfileData(profile)
        if(data.resultCode === ResultCode.success){
            dispatch(profileUser(userId))
        }
    }
}
export default profileReducer