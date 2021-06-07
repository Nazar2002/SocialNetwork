import MyPosts from './MyPosts';
import {action} from '../../../redux/profile-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../../redux/store-redux';
import { postDataType } from '../../../types/types';
type MapStateToPropsType = {
    postData:Array<postDataType>
}
const mapStateToProps = (state:AppStateType):MapStateToPropsType => {
    return{
         postData:state.profilePage.postData,
    };
};

export default compose<React.ComponentType>(connect(mapStateToProps,{addPost: action.addPost}),withAuthRedirect)(MyPosts);