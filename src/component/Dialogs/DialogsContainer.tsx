import Dialogs from './Dialogs';
import {action} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../hoc/withAuthRedirect';
import {compose} from 'redux';
import { AppStateType } from '../../redux/store-redux';
import { dialogsMessageType } from '../../types/types';
type MapStateToPropsType = {
    dialogsData:Array<dialogsMessageType>
    messages:Array<dialogsMessageType>
    newMessageText:string|null
}

const mapStateToProps = (state:AppStateType):MapStateToPropsType => {
    return{
        dialogsData:state.dialogsPage.dialogsData,
        messages:state.dialogsPage.messages,
        newMessageText:state.dialogsPage.newMessageText,
    };
};


export default compose<React.ComponentType>(connect(mapStateToProps,{sendMessage: action.sendMessage}),withAuthRedirect)(Dialogs);