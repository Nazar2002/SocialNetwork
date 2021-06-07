import { dialogsMessageType } from '../../../types/types'
import s from './Message.module.css'
type PropsType = {
    message: dialogsMessageType | string | undefined
}
const Message:React.FC<PropsType>= ({message}) => {
    return(
       <div className={s.message}>{message}</div> 
    )
}

export default Message