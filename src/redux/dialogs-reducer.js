const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
    switch(action.type){
        case SEND_MESSAGE:
            let body = action.message;
            return {
                ...state,
                messages: [...state.messages, {id:6, message: body}],
            }
        default: 
            return state;
    }
}

export const sendMessageCreator = (message) => ({type: SEND_MESSAGE, message});

export default dialogsReducer;