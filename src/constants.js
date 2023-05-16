export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
}

export const PAGE_STATUS = {
    PERSONAL: 'personalSpace',
    FRIEND: 'friendSpace',
}

export const ERROR = {
    NETWORK_ERROR: 'network-error',
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_VALID_BIRTHDAY: 'required-valid-birthday',
    REQUIRED_GIFT: 'required-gift',
    REQUIRED_FRIEND_USERNAME :'required-friend-username',
    NO_SUCH_ID: 'no-such-id',
    CHANGE_FORBIDDEN: 'change-forbidden',
    NO_SUCH_USERNAME: 'no-such-username',
    UNKNOWN_ACTION: 'unknownAction',
}

export const ERROR_MESSAGES = {
    [ERROR.NETWORK_ERROR]: 'Trouble connecting to the network. Please try again.',
    [ERROR.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
    [ERROR.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers and/or _) username',
    [ERROR.REQUIRED_VALID_BIRTHDAY]: 'Invalid Date: Please enter a valid date for birthday.',
    [ERROR.REQUIRED_GIFT]: 'Invalid: Gift content cannot be empty. Please enter a valid gift.',
    [ERROR.REQUIRED_FRIEND_USERNAME]: "Please enter a valid username of your friend's",
    [ERROR.NO_SUCH_ID]: 'The gift item you selected does not exist. Refresh to get up-to-date data.',
    [ERROR.CHANGE_FORBIDDEN]: 'Your gift item has already been claimed. Change is not allowed.',
    [ERROR.NO_SUCH_USERNAME]: 'No record found.',
}

export const ACTIONS = {
    LOG_IN: 'logIn',
    LOG_OUT: 'logout',
    LOG_PENDING: 'logPending',
    REPORT_ERROR: 'reportError',
    START_LOADING_DATA: 'startLoadingData',
    GET_DATA: '',
    UPDATE_BIRTHDAY: 'updateBirthday',
    CLEAR_ERROR: 'clearError',
    GET_BIRTHDAY: 'getBirthday',
    GET_GIFT: 'getGift',
    ADD_GIFT: 'addGift',
    CHANGE_GIFT: 'changeGift',
    DELETE_GIFT: 'deleteGift',
}