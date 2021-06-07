import { contactsType, profileType } from "../../../types/types"

type PropsType = {
  isOwner:boolean
  onToEditMode:()=>void
  profile:profileType
}
const ProfileData:React.FC<PropsType> = (props)=>{
    return(
        <>
          {props.isOwner && <button onClick={props. onToEditMode}>edit</button>}
          <div>
            <b>My fullName</b>:{props.profile.fullName}
          </div>
          <div>
            <b>Looking for a joob</b>:{props.profile.lookingForAJob ? 'yes':'no'}
          </div>
          <div>
            <b>My professional skills</b>:{props.profile.lookingForAJobDescription}
          </div>
          <div>
            <b>About Me</b>:{props.profile.aboutMe}
          </div>
          <div>
            <b>Contacts</b>:
              {Object.keys(props.profile.contacts)
                .map(key => {
                 return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key as keyof contactsType]}/>})
              }
          </div>
        </>
    )
}
type ContactPropsType = {
  contactTitle:string
  contactValue:string
}
const Contact:React.FC<ContactPropsType> = ({contactTitle,contactValue}) => {
    return(
      <div>
        <div><b>{contactTitle}</b>:{contactValue}</div>
      </div>
    )
}
export default ProfileData;