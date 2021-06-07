import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileItem.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';
import ProfileData from './ProfileData';
import React,{ChangeEvent, useState} from 'react'
import { profileType } from '../../../types/types';
type PropsType = {
  savePhoto:(values:any)=>void
  saveProfileData:(profile:profileType)=>void
  profile:profileType|null
  isOwner:boolean
  status:string
  updateStatus:(status:string)=>void
}

const ProfileItem:React.FC<PropsType> = (props) => {
  
  let [editMode,setEditMode] = useState<boolean>(false);
  
  const mainPhotoSelected =(e:ChangeEvent<HTMLInputElement>) => {
    if(e.target.files?.length){
      props.savePhoto(e.target.files[0])
    }
  }

  const saveProfile = (values:profileType) => {
    props.saveProfileData(values);
    setEditMode(false);
  }

  if(props.profile==null){return <Preloader/>}

  
  return(
    <>
      <div>
        <img className={s.userPhoto} src={props.profile.photos.small||"https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"} />
        <div className={s.item}>
          {props.isOwner && <input type='file' onChange={mainPhotoSelected}/>}
        </div>
       {editMode 
        ? <ProfileDataForm 
            saveProfile={saveProfile} 
            profile={props.profile}/>
        : <ProfileData 
            profile={props.profile} 
            isOwner={props.isOwner} 
            onToEditMode={()=>{setEditMode(true)}}/>}
      </div>
        <ProfileStatusWithHooks
          status={props.status} 
          updateStatus={props.updateStatus}/>
    </>
  );
};


export default ProfileItem;