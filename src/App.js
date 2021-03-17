import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/Login';
import { compose } from "redux";
import { getAuthData } from './redux/auth-reducer';
import { connect } from 'react-redux';
import { initializeState } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { Provider } from 'react-redux';
import store from './redux/redux-store';
import withSuspense from './hoc/withSuspense';
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

class App extends React.Component{
  componentDidMount() {
    this.props.initializeState();
  }

  render(){
    if(!this.props.initialized){
      return <Preloader/>
    }
    return (
      <div className="app-wrapper">
       <HeaderContainer/>
       <Navbar/>
       <div className="app-wrapper-content">
         <Route path="/profile/:userId?" 
         render={withSuspense(ProfileContainer)}/>
         <Route path="/dialogs" 
         render={withSuspense(DialogsContainer)}/>
          <Route path="/users" 
         render={() => <UsersContainer/>}/>
         <Route path="/news" component={News}/>
         <Route path="/music" component={Music}/>
         <Route path="/settings" component={Settings}/>
         <Route path="/login" 
         render={() => <LoginPage/>}/>
       </div>
   </div>
   );
  }
}

const mapStateToProps = (state) => ({initialized: state.app.initialized})

let AppContainer = compose(withRouter,
  connect(mapStateToProps, {initializeState}))(App);

let SamuraiJSApp = (props) => {
  return <React.StrictMode>
  <BrowserRouter>
  <Provider store={store}>
      <AppContainer/>
  </Provider>
  </BrowserRouter>
</React.StrictMode>
}

export default SamuraiJSApp