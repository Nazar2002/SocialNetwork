import {Form,Formik,Field} from 'formik';
import {login} from '../../redux/auth-reducer';
import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import s from './Login.module.css'
import { Redirect } from 'react-router';
import store, { AppStateType } from '../../redux/store-redux';
type Values ={
    email:string
    password:string
    rememberMe:boolean
    captcha:string|null
}
type LoginFormPropsType = {
    onSubmit:(values:Values)=>void
    captchaUrl:string|null
}

const LoginForm:React.FC<LoginFormPropsType> = (props) => {   
    function validateLogin(value:Values) {
        let error:string | undefined;
        if (!value) {
          error = 'Required';
        }
        else
            return error;
      }
      
      function validatePassword(value:Values) {
        let error:string | undefined;
        if (!value) {
            error = 'Required';
          }
        return error;
      } 
    return(
        <Formik  
            initialValues={{
                email: '',  
                password: '',   
                rememberMe: false,
                captcha: null
            }}
            onSubmit={(values:Values) => {
                props.onSubmit(values);
            }}
            >
            {({ errors, touched }) => (
                <Form>
                    <div>
                        <Field placeholder="Email" type="email" name="email" validate={validateLogin}/> 
                        {errors.email && touched.email && <div className={s.error}>{errors.email}</div>}
                    </div>
                    <div>
                        <Field placeholder="Password" type="password" name="password" validate={validatePassword}/>
                        {errors.password && touched.password && <div className={s.error}>{errors.password}</div>}
                    </div>
                    <div>
                        <Field type="checkbox" name="rememberMe"/>Remember Me
                    </div>
                    {props.captchaUrl && <img src={props.captchaUrl}/>}
                    <div>
                        {props.captchaUrl && <Field placeholder="Input Text" type="captcha" name="captcha"/>}
                    </div>
 
                       
                    <button type="submit">Submit</button>
                    
                </Form>
            )}
        </Formik>
    )
}


export const Login:React.FC = () => {
    const isAuth = useSelector((state:AppStateType)=>state.auth.isAuth)
    const captchaUrl = useSelector((state:AppStateType)=>state.auth.captchaUrl)
   
    const dispatch = useDispatch();
    const onSubmit = (values:Values) => {
        dispatch(login(values.email,values.password,values.rememberMe,values.captcha))
        console.log(values);
    }
   
    
    if(isAuth){
        return <Redirect to={"/profile"}/>
    }
    return(
        <>
            <h1>Login</h1>
            <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </>
    )
}
