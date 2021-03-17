import { getAuthData } from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS"

const initialState = {
    initialized: false
}

const appReducer = (state= initialState, action) => {
    switch(action.type){
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

const initializedSuccess = () => ({type:INITIALIZED_SUCCESS});

export const initializeState = () => (dispatch) => {
    let promise = dispatch(getAuthData());

    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess())
    })
}

export default appReducer;