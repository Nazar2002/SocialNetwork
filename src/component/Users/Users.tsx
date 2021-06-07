import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requesUsers } from '../../redux/users-reducer';
import { getCurrentPage, getPageSize, getTotalUsersCount, getUsers,getFollowingProgres, getFilter } from '../../redux/users-selector';
import Paginator from '../common/Paginator/Paginator';
import {followSuccess,unFollowSuccess} from '../../redux/users-reducer';
import User from './User';
import UsersSearchForm, { FilterType } from './UsersSearchForm';

export const  Users: FC = () => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const users = useSelector(getUsers)
    const followingProgress = useSelector(getFollowingProgres)
    const filter = useSelector(getFilter)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(requesUsers(currentPage,pageSize,filter))
    },[])
    const onPageChanged = (currentPage: number) => {
        dispatch(requesUsers(currentPage,pageSize,filter))
    }
    const onFilterChange = (filter:FilterType)=>{
        dispatch(requesUsers(1,pageSize,filter))
    }
    const followSuccessF = (userId:number)=>{
        dispatch(followSuccess(userId))
    }
    const unFollowSuccessF = (userId:number)=>{
        dispatch(unFollowSuccess(userId))
    }

return(
    <div>
        <UsersSearchForm onFilterChange={onFilterChange}/>
        <Paginator 
            totalItemsCount={totalUsersCount} 
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
        />   
        {users.map(u =><User 
            followed
            user={u} 
            key={u.id} 
            followingProgress={followingProgress}
            followSuccess={followSuccessF}
            unFollowSuccess={unFollowSuccessF}
            />)
        }
    </div>    
)}
