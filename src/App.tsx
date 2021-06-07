import './App.css'
import { UsersPage } from './component/Users/UsersPage'
import React from 'react'
import { compose } from 'redux'
import {withRouter,Switch, Redirect, NavLink, Link} from 'react-router-dom'
import {Route} from 'react-router-dom'
import {Login} from './component/Login/Login'
import { connect } from 'react-redux'
import {initialisedApp} from './redux/app-reducer'
import Preloader from './component/common/Preloader/Preloader'
import { AppStateType } from './redux/store-redux'
import { Layout, Menu} from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Header } from './component/Header/Header'


const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const  DialogsContainer = React.lazy(() => import('./component/Dialogs/DialogsContainer'))
const  ProfileContainer = React.lazy(() => import('./component/Profile/ProfileContainer'))
const  ChatPageContainer = React.lazy(() => import('./component/Chat/ChatPage'))

type PropsType = MapStateToPropsType & MapDispatchToPropsType
 
type MapStateToPropsType = {
  initialised:boolean|null
}
type MapDispatchToPropsType = {
  initialisedApp:()=>void
}
class App extends React.Component<PropsType> {
  componentDidMount(){
    this.props.initialisedApp()
  }
  render(){
    if(!this.props.initialised) <Preloader/>
    return (
      <Layout>
           <Header />
     
    <Content style={{ padding: '0 50px' }}>
     
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Profile">
              <Menu.Item key="1"><Link to="/Profile">Profile</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/Dialogs" >Messages</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
              <Menu.Item key="5"><Link to="/Users">Users</Link></Menu.Item>
              <Menu.Item key="6"><Link to="/Chat">Chat</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Setting">
              <Menu.Item key="9">Setting</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <React.Suspense fallback={<Preloader/>}>
            <Switch >
              <Route exact path='/' render={()=><Redirect to={"/profile"}/>}/>
              <Route path='/Profile/:userId?' render={ () => <ProfileContainer />} />
              <Route path='/Dialogs' render={ () => <DialogsContainer /> }/> 
              <Route path='/Users' render={ () => <UsersPage /> }/> 
              <Route path='/Login'render={ () => <Login/>}/>
              <Route path='/Chat'render={ () => <ChatPageContainer/>}/>
              <Route path='/*' render={()=><div>Error 404</div>}/>
            </Switch>
          </React.Suspense>
        </Content>      
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Social network</Footer>
  </Layout>
        /*<div className='app-wraper'>
            <HeaderContainer />
            <Navbar />
          <div className='app-wraper-content'>
            <React.Suspense fallback={<Preloader/>}>
            <Switch >
              <Route exact path='/' render={()=><Redirect to={"/profile"}/>}/>
              <Route path='/Profile/:userId?' render={ () => <ProfileContainer />} />
              <Route path='/Dialogs' render={ () => <DialogsContainer /> }/> 
              <Route path='/Users' render={ () => <UsersPage /> }/> 
              <Route path='/Login'render={ () => <Login/>}/>
              <Route path='/*' render={()=><div>Error 404</div>}/>
            </Switch>
            </React.Suspense>
  
          </div>
        </div>
        */
    )
    
  } 
}
const mapStateToProps =(state:AppStateType) :MapStateToPropsType=> {
  return{
    initialised:state.app.initialised
  }
}
export default compose<React.ComponentType>(
  connect<MapStateToPropsType,MapDispatchToPropsType,{},AppStateType>(mapStateToProps,{initialisedApp}),
  withRouter,
  )(App);
