import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Route, withRouter, Switch, Redirect} from 'react-router-dom';
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
  catchAllUnhandledErrors = (reason, promise) => {
     alert("Some error ocurred");
  }

  componentDidMount() {
    this.props.initializeState();
    // window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
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
         <Switch>
         <Route exact path="/" 
          render={() => <Redirect to={"/profile"}/>}/>
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
          <Route path="*" 
          render={() =><div>404 not found</div>}/>
         </Switch>
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
  <BrowserRouter basename={process.env.PUBLIC_URL}>
  <Provider store={store}>
      <AppContainer/>
  </Provider>
  </BrowserRouter>
</React.StrictMode>
}

export default SamuraiJSApp