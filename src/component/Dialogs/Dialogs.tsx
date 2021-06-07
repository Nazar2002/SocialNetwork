import React, { FC } from 'react';
import Message from './Messages/Message';
import DialogsItem from './DialogsItem/DialogsItem'
import s from './Dialogs.module.css';
import { Field, Form, Formik } from 'formik';
import { dialogsMessageType } from '../../types/types';
type PropsFormType = {
    addMessage:(newMessageText: string)=>void
}
const AddMessageForm:FC<PropsFormType> = ({addMessage}) => {
    return(
        <Formik
            initialValues= {{
                newMessageText:""
            }}
            onSubmit={(values:{newMessageText:string})=>{
                addMessage(values.newMessageText)
            }}>
            <Form>
                <Field type="text" name="newMessageText" placeholder="Input message"></Field>
                <button>AddMessage</button>
            </Form>
        </Formik>
    )
}
type PropsType = {
    dialogsData: Array<dialogsMessageType>
    messages: Array<dialogsMessageType>
    sendMessage:(newMessageText:string)=>void
}
const Dialogs: React.FC<PropsType> = ({dialogsData,messages,sendMessage}) => {

    const addMessage = (newMessageText: string) => {sendMessage(newMessageText)};


    let dialogElements = dialogsData.map(data => <DialogsItem name = {data.name} id = {data.id} src = {data.src} key={data.id}/>);
    let messagesElements = messages.map(data => <Message message = {data.message} key={data.id}/>);

    return(
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
            <div className={s.item}>
                <AddMessageForm addMessage={addMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;