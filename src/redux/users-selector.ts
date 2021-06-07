import { createSelector } from "reselect"
import { AppStateType } from "./store-redux"

const getUsersSelector=(state: AppStateType)=>{
    return state.usersPage.users
}
export const getUsers = createSelector(getUsersSelector,(users)=>{
    return users.filter(u=>true)
})
export const getPageSize=(state: AppStateType)=>{
    return state.usersPage.pageSize
}
export const getFilter=(state: AppStateType)=>{
    return state.usersPage.filter
}
export const getTotalUsersCount=(state: AppStateType)=>{
    return state.usersPage.totalUsersCount
}
export const getCurrentPage=(state: AppStateType)=>{
    return state.usersPage.currentPage
}
export const getIsFetching=(state: AppStateType)=>{
    return state.usersPage.isFetching
}
export const getFollowingProgres=(state: AppStateType)=>{
    return state.usersPage.followingProgress
}