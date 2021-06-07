import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'redux';
import {profileUser,getStatus,updateStatus,savePhoto,saveProfileData} from '../../redux/profile-reducer';
import { AppStateType } from '../../redux/store-redux';
import { profileType } from '../../types/types';
import Profile from './Profile';

type MapStateToPropsType = {
    autorizedUserId:number|null
    profile:profileType|null
    status:string
}
type MapDispatchToPropsType = {
    profileUser:(userId:number)=>void
    getStatus:(userId:number)=>void
    updateStatus:(status:string)=>void
    savePhoto:(file: string)=>void
    saveProfileData:(profile:profileType)=>void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<PathParamsType>
type PathParamsType = {
    userId:string
}

type StateType = {
}
class ProfileContainer extends React.Component<PropsType , StateType>{
    refreshProfile(){
        let userId:number|null = +this.props.match.params.userId;
        if(!userId){userId = this.props.autorizedUserId}
        this.props.profileUser(userId as number);
        this.props.getStatus(userId as number);
    }
   componentDidMount(){
       this.refreshProfile();
    }
    componentDidUpdate(prevProps:PropsType,prevState:StateType){
        if(this.props.match.params.userId != prevProps.match.params.userId){
            this.refreshProfile();
        }
    }
    render(){
        return(
            <Profile 
            {...this.props} 
            isOwner ={!this.props.match.params.userId}
            profile={this.props.profile} 
            status={this.props.status} 
            updateStatus={this.props.updateStatus}
            savePhoto={this.props.savePhoto}
            saveProfileData={this.props.saveProfileData}/>
        )
    }
}
let mapStateToProps = (state:AppStateType) => {
    return{
        profile: state.profilePage.profile,
        status :state.profilePage.status,
        autorizedUserId: state.auth.id
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,{profileUser,getStatus,updateStatus,savePhoto,saveProfileData}),
    withRouter
)(ProfileContainer)