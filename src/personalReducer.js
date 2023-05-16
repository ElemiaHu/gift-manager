import { ACTIONS, ERROR_MESSAGES, ERROR } from "./constants";

export const initialState = {
    loadingData: true,
    error: '',
    birthday: '',
    gifts: {},
}

function reducer(state, action) {
    switch(action.type) {
        
        case ACTIONS.GET_DATA:
            return {
                ...state,
                error: '',
                loadingData: false,
                birthday: action.birthday,
                gifts: action.gifts,
            }

        case ACTIONS.UPDATE_BIRTHDAY:
            return {
                ...state,
                error: '',
                birthday: action.birthday,
            }

        case ACTIONS.ADD_GIFT:
            return {
                ...state,
                error: '',
                gifts: {
                    ...state.gifts,
                    [action.gift.id]: action.gift,
                },
            }

        case ACTIONS.CHANGE_GIFT:
            return {
                ...state,
                error: '',
                gifts: {
                    ...state.gifts,
                    [action.gift.id]: action.gift,
                }
            }

        case ACTIONS.DELETE_GIFT:
            const giftsCopy = {...state.gifts};
            delete giftsCopy[action.id];
            return {
                ...state,
                error: '',
                gifts: giftsCopy,
            }

        case ACTIONS.REPORT_ERROR:
            return {
                ...state,
                error: ERROR_MESSAGES[action.error],
            }
        
        case ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: '',
            }

        default:
            throw new Error({ error: ERROR.UNKNOWN_ACTION, detail: action });
        
    }
}

export default reducer;