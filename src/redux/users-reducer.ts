import { FilterType } from './../component/Users/UsersSearchForm';
import { ResultCode } from './../API/Api'
import { AppStateType, InferActionsType } from './store-redux'
import { usersType } from './../types/types'
import { usersAPI } from "../API/Users-Api"
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'react'
import { action } from './profile-reducer'

const FOLLOW = 'users-reducer/FOLLOW'
const UNFOLLOW = 'users-reducer/UNFOLLOW'
const SET_USERS = 'users-reducer/SET_USERS'
const SET_CURRENT_PAGE = 'users-reducer/SET_CURRENT_PAGE'
const TOOGLE_IS_FETCHING = 'users-reducer/TOOGLE_IS_FETCHING'
const TOOGLE_IS_FOLLOWING_PROGRESS = 'users-reducer/TOOGLE_IS_FOLLOWING_PROGRESS'
const SET_FILTER = 'users-reducer/SET_FILTER'

type initialeStateType = {
    users: Array<usersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingProgress: Array<number>
    filter:{
        term:string
        friend:null|boolean
    }
}
let initialeState:initialeStateType = {
    users : [],
    pageSize: 4,
    totalUsersCount: 30,
    currentPage: 1,
    isFetching: true,  
    followingProgress: [ ],
    filter:{
        term:'',
        friend:null
    }
}

const usersReducer = (state=initialeState,action: ActionsType): initialeStateType => {
    switch(action.type){
        case FOLLOW : 
            return {
                ...state,
                users: state.users.map( user => {
                    if(user.id === action.userId){
                        return {...user, followed: true}
                    }
                    return user
                }),
            }
        case UNFOLLOW :
            return {
                ...state,
                users: state.users.map( user => {
                    if(user.id === action.userId){
                        return {...user, followed: false}
                    }
                    return user;
                }),
            }
        case SET_USERS :
            return{...state, users: action.users}
        case SET_CURRENT_PAGE :
            return{...state, currentPage: action.currentPage}
        case TOOGLE_IS_FETCHING :
            return{...state , isFetching :action.isFetching}
        case TOOGLE_IS_FOLLOWING_PROGRESS :
            return{
                ...state, followingProgress :action.isFetching
                ? [...state.followingProgress, action.userId]
                : state.followingProgress.filter(id => id!= action.userId)
            }
        case SET_FILTER :
            return{...state,filter:action.payload}
        default :
            return state
    }
}

export const actions = {
    follow : (userId: number) => {
        return {type: FOLLOW, userId} as const},
    unFollow : (userId: number) => {
        return {type: UNFOLLOW, userId} as const},
    setUsers : (users: Array<usersType>) => {
        return {type: SET_USERS, users} as const},
    setCurrentPage : (currentPage: number)=> {
        return {type: SET_CURRENT_PAGE, currentPage} as const},
    toogleIsFetching : (isFetching: boolean)=> {
        return {type: TOOGLE_IS_FETCHING, isFetching} as const},
    toogleFollowingProgress : (isFetching: boolean, userId: number)=> {
        return {type: TOOGLE_IS_FOLLOWING_PROGRESS, isFetching, userId} as const},
    setFilter:(filter:FilterType)=>{
        return{type:SET_FILTER,payload:filter} as const}
}


type ActionsType = InferActionsType<typeof actions>

type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const requesUsers = (currentPage: number, pageSize: number,filter:FilterType): ThunkType=>{
    return async(dispatch) => {
        dispatch(actions.toogleIsFetching(true))
        dispatch(actions.setCurrentPage(currentPage))
        dispatch(actions.setFilter(filter))
        let data = await usersAPI.getUsers(currentPage,pageSize,filter.term,filter.friend)
        dispatch(actions.toogleIsFetching(false))
        dispatch(actions.setUsers(data.items))
    }
}
const followUnfollowFlow = async(
    dispatch: DispatchType,
    userId: number,
    apiMethod: any,
    actionCreator:(userId: number)=> ActionsType) => {
        dispatch(actions.toogleFollowingProgress(true, userId))
        let data = await apiMethod(userId)
        if(data.resultCode==ResultCode.success) {
            dispatch(actionCreator(userId))
        }
        dispatch(actions.toogleFollowingProgress(false, userId))
    }
export const unFollowSuccess = (userId: number): ThunkType=> {
    return async(dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unFollowUsers.bind(usersAPI), actions.unFollow)
    }
}
export const followSuccess = (userId: number): ThunkType=> {
    return async(dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.followUsers.bind(usersAPI), actions.follow)
    }
}

export default usersReducer