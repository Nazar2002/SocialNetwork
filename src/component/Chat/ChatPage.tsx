import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, startMessageListening, stopMessageListening } from "../../redux/chat-reducer";
import { AppStateType } from "../../redux/store-redux";
type ChatMessageType ={
    message:string
    photo:string
    userName:string
} 

const ChatPage:React.FC = () => {
    return(
       <Chat />
    )
}
const Chat = ()=>{
   const dispatch = useDispatch()
   
   useEffect(()=>{
       dispatch(startMessageListening())
       return ()=>{
           dispatch(stopMessageListening())
       }
   },[])
    return(
        <>
            <Messages />
            <AddMessage/>
        </>
    )
}
const Messages:React.FC = () =>{

    let messages = useSelector((state:AppStateType)=>state.chat.messages)
    return(
        <div style={{height:'400px',overflowY:'auto'}}>
             {messages.map((m,index)=><Message key={index} message={m}/>)}
        </div>
       
    )
}
const Message:React.FC<{message:ChatMessageType}> = React.memo(({message})=>{
    return(
        <div>
            <img src={message.photo} style={{width:'30px'}}/><b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    )
})
const AddMessage:React.FC = ()=>{
    const [message,setMessage] = useState('')
    const status= useSelector((state:AppStateType)=>state.chat.status)
    const dispatch = useDispatch()
    const sendMessageHandler = () => {
        if(!message){
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }
    return(
        <>
        <div>
            <textarea onChange={(e)=>setMessage(e.target.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={status !=='ready'} onClick={sendMessageHandler}>Send</button>
        </div>
        </>
    )
}
export default ChatPage
