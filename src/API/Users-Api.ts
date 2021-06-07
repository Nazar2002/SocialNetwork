import { usersType } from '../types/types';
import { instance, ResponseType } from './Api';
type getUsersType ={
    items:Array<usersType>
    totalCount:number
    error:string|null
}
export const usersAPI = {
    getUsers(currentPage: number =1, pageSize: number = 2,term:string = '',friend:null|boolean=null){
        return instance.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`+(friend===null?'':`&friend=${friend}`))
            .then(response => {return response.data})
    },
    followUsers(id: number = 1){
        return instance.post<ResponseType>(`follow/${id}`)
            .then(response => {return response.data})
    },
    unFollowUsers(id: number = 1){
        return instance.delete<ResponseType>(`follow/${id}`)
            .then(response => {return response.data})
    }
}