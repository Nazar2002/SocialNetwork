import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileItem from './ProfileItem/ProfileItem'
import s from './Profile.module.css'
import { profileType } from '../../types/types'
type PropsType = {
  saveProfileData:(profile:profileType)=>void
  savePhoto:(file:string)=>void
  isOwner:any
  profile:profileType|null
  status:string
  updateStatus:(status:string)=>void
}
const Profile: React.FC<PropsType> = (props) => { 
  return (
    <>
    <div>
      <ProfileItem 
        saveProfileData={props.saveProfileData}
        savePhoto={props.savePhoto} 
        isOwner={props.isOwner} 
        profile={props.profile} 
        status={props.status} 
        updateStatus={props.updateStatus}/>
       <MyPostsContainer />
    </div>
  </>
  )
}

export default Profile