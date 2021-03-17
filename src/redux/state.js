import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
  _state: {
    profilePage: {
        posts: [
            {id: 1, message: 'How are you?', likesCount: 3},
            {id: 2, message: 'It\'s my first post', likesCount: 4},
          ],
          newPostText: 'it-kamasutra'
    },
    dialogsPage: {
        dialogs: [
            {id:1, name:'Nare'},
            {id:2, name:'Roman'},
            {id:3, name:'Sarine'},
          ],
        messages: [
            {id: 1, message: 'Hello!'},
            {id: 2, message: 'How are you?'},
            {id: 3, message: 'Yo!'},
          ],
          newMessageBody: ""
    },
    sidebar: {}
  },
  _callSubscriber() {
    console.log('state changed')
  }, 
  getState(){
      return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action){
    profileReducer(this._state.profilePage, action);
    dialogsReducer(this._state.dialogsPage, action);
    sidebarReducer(this._state.sidebar, action);
    this._callSubscriber(this._state)
  }
}

window.store = store;

export default store;