import Post from './Post/Post';
import React from 'react';
import s from './MyPosts.module.css';
import { Field, Form, Formik } from 'formik';
import { postDataType } from '../../../types/types';
type Values = {
    newPostText:string
}
type MyPostFormType = {
    addPost:(newPostText:string)=>void
}
const MyPostForm:React.FC<MyPostFormType> = (props) => {
    return(
        <Formik
            initialValues={{
                newPostText : ""
            }}
            onSubmit={(values:Values)=>{
                props.addPost(values.newPostText)
            }}
        >
            <Form>
                <Field type="text" name="newPostText" placeholder="InputPost"/>
                <div>
                   <button type="submit">AddPost</button> 
                </div>
            </Form>
        </Formik>
    )
}
type MyPostType = {
    postData:Array<postDataType>
    addPost:(newPostText:string)=>void
}
const MyPosts:React.FC<MyPostType> = (props) => {
    let postElements = props.postData.map( data => <Post message = {data.message} key={data.id}/>);
    const addPost = (newPostText:string) => {props.addPost(newPostText)}
    return(
        <div>
            <div>My post</div>
            <div>
                <MyPostForm addPost={addPost}/>
            </div>  
            {postElements}
        </div>
    );
};

export default MyPosts;