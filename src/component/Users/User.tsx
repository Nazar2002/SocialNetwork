import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { usersType } from '../../types/types';
import s from './Users.module.css';
type PropsType = {
    user: usersType
    followingProgress: Array<number>
    followSuccess:(userId: number)=> void
    unFollowSuccess:(userId: number)=> void
    followed: boolean
}
let User: FC<PropsType> = ({user,followingProgress,followSuccess,unFollowSuccess}) => {
return(
    <div className={s.item}>
        <NavLink to={'/Profile/'+user.id }>
            <img src={user.photos.small 
                !=null 
                ? user.photos.small 
                :"https://e7.pngegg.com/pngimages/85/114/png-clipart-avatar-user-profile-male-logo-profile-icon-hand-monochrome.png"} className={s.stylephoto}
            />
        </NavLink>
        <div>
            <span>{user.name}</span>
        </div>
        <div>
            <span>{user.status}</span>
        </div>
        <div>
            {user.followed
                ? <button disabled={followingProgress.some(id => id===user.id)} 
                    onClick={()=>{unFollowSuccess(user.id)
                }}>Unfollow</button>
                       
                : <button disabled={followingProgress.some(id => id===user.id)} 
                    onClick={()=>{followSuccess(user.id)
                }}> Follow</button>
            }      
        </div>
    </div>
)}
export default User;