const users = {
    'test_user': {
        birthday: 0,
        giftList: {},
    },
};

function usernameValidation(username) {
    username.trim();
    if(username.match(/[Dd][oO][gG]/)) return 'not-allowed';
    else if(!username.match(/^[A-Za-z0-9_-]+$/)) return 'invalid-username';
    else return 'valid-username';
}

function birthdayValidation(birthday) {
    const date = new Date(birthday);
    if (isNaN(date.getMilliseconds())) return false;
    return true;
}

function getUserData(username) {
    return users[username];
}

function addUserData(username, userData) {
    users[username] = userData;
}

function updateBirthday(username, newBirthday) {
    users[username].birthday = newBirthday;
}

module.exports = {
    users,
    usernameValidation,
    birthdayValidation,
    getUserData,
    addUserData,
    updateBirthday,
}