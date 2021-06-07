import {Form,Formik,Field} from 'formik';
import { FC } from 'react';
import { contactsType, photosType } from '../../../types/types';
type PropsType = {
  profile:{
    fullName:string
    lookingForAJob:boolean
    lookingForAJobDescription:string
    aboutMe:string
    contacts:contactsType
    photos:photosType
  }
  saveProfile:(values:
    {
      fullName:string
      lookingForAJob:boolean
      lookingForAJobDescription:string
      aboutMe:string
      contacts:contactsType
      photos:photosType
    })=>void
}
const ProfileDataForm:FC<PropsType> = (props)=>{
    return(
      <Formik 
        initialValues={{
        fullName: props.profile.fullName,  
        lookingForAJob: props.profile.lookingForAJob, 
        lookingForAJobDescription: props.profile.lookingForAJobDescription,
        aboutMe: props.profile.aboutMe,
        contacts: props.profile.contacts,
        photos:props.profile.photos
        }}
        onSubmit={(values) => {
         props.saveProfile(values);
        }}
      >
        <Form>
          <div>
            <b>FullName</b>:  
            <div><Field type="fullName" name="fullName"/></div> 
          </div>
          <div>
            <b>LookingForAJob</b>:
            <div><Field type="checkbox" name="lookingForAJob"/></div>              
          </div>
          <div>
            <b>MyProfecionalSkills</b>:  
            <div><Field type="text" name="lookingForAJobDescription"/></div>
          </div>
          <div>
            <b>AboutMe</b>:  
            <div><Field type="text" name="aboutMe"/></div>
          </div>
          <div>
            <b>Contacts</b>:
              {Object.keys(props.profile.contacts).map(key => {return(
                <div>
                  <b>{key}</b>
                  <div><Field type="input" name={"contacts." + key}/></div>
                </div>)})
              }
          </div>
          <div>
            <button type="submit">Save</button>
          </div>   
        </Form>
      </Formik>
    )
  }
export default ProfileDataForm;