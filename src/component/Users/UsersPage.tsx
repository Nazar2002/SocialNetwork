import React from 'react';
import { useSelector } from 'react-redux';
import {getIsFetching} from '../../redux/users-selector';
import {Users} from './Users';
import Preloader from '../common/Preloader/Preloader';


export const UsersPage :React.FC=()=>{
    const isFetching = useSelector(getIsFetching)
        return (
            <>
                {isFetching ? <Preloader/> :null}
                <Users />
            </>
        )
}

