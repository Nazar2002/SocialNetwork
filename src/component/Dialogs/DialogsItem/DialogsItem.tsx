import s from './DialogsItem.module.css'
import { NavLink } from 'react-router-dom'
type PropsType = {
    id: number | null | undefined
    name: string | null | undefined
    src: string |undefined
}
const DialogsItem: React.FC<PropsType> = ({id,name,src}) => {
    let path = "/Dialogs/" + id
    return(
        <div className={s.dialog}>
            <img className={s.avatar} src={src}></img>
            <div className={s.name}>
                <NavLink to={path} activeClassName ={s.activeLink}>{name}</NavLink>
            </div>
        </div>
    )
}

export default DialogsItem