import { ACTIONS, LOGIN_STATUS, ERROR_MESSAGES, ERROR } from "./constants";

export const initialState = {
    loginStatus: LOGIN_STATUS.PENDING,
    username: '',
    error: '',
}
  
function reducer(state, action) {
    switch(action.type) {

        case ACTIONS.LOG_IN:
            return {
                loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
                username: action.username,
                error: '',
            }

        case ACTIONS.LOG_OUT:
            return {
                loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
                username: '',
                error: '',
            }

        case ACTIONS.LOG_PENDING: 
            return {
                ...state,
                loginStatus: LOGIN_STATUS.PENDING,
            }
        
        case ACTIONS.REPORT_ERROR:
            return {
                ...state,
                error: ERROR_MESSAGES[action.error],
            }
        
        default:
            throw new Error({ error: ERROR.UNKNOWN_ACTION, detail: action });
    }
}

export default reducer;