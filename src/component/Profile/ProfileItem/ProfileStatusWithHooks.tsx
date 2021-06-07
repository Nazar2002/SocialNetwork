import React,{useState,useEffect, ChangeEvent} from 'react';
import s from './ProfileItem.module.css';
type PropsType = {
    status:string
    updateStatus:(status:string)=>void
}
const ProfileStatusWithHooks:React.FC<PropsType> = (props) => {
    let [editMode,setEditMode] = useState(false);
    let [status,setStatus] = useState(props.status);
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    const activateEditMode = () => {
        setEditMode(true);
    }
    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }
    const onStatusChange = (event:ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value);
    }
    return(
        <div className={s.item}>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "---"}</span> 
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deActivateEditMode} value={status}/>
                </div>
            }
        </div>
    )
}
export default ProfileStatusWithHooks;