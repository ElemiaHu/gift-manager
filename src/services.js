export function fetchSession() {
    return fetch('/api/session')
    .catch( () => Promise.reject({ error: 'network-error' }))
    .then( response => {
        if(!response.ok) {
            return response.json().then(error => Promise.reject(error));
        }
        return response.json();
    });
}

export function fetchLogin(username) {
    return fetch('/api/session', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ error: 'network-error' }))
    .then( response => {
        if(!response.ok) {
            return response.json().then(error => Promise.reject(error));
        }
        return response.json();
    });
}

export function fetchLogout() {
    return fetch('/api/session', {
        method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'network-error' }))
    .then( response => response.json());
}

export function fetchUserData() {
    return fetch('/api/user')
    .catch( () => Promise.reject({ error: 'network-error' }))
    .then( response => {
        if(!response.ok) {
            return response.json().then(error => Promise.reject( error ));
        }
        return response.json();
    });
}

export function fetchUpdateBirthday(birthday) {
    return fetch('/api/birthday', {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ birthday })
    })
    .catch( () => Promise.reject({ error: 'network-error' }))
    .then( response => {
        if(!response.ok) {
            return response.json().then(error => Promise.reject( error ));
        }
        return response.json();
    });
}

export function fetchAddGift(gift) {
    return fetch('/api/gift', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ gift }),
    })
    .catch( () => Promise.reject({ error: 'network-error' }))
    .then( response => {
        if(!response.ok) {
            return response.json().then(error => Promise.reject(error ));
        }
        return response.json();
    });
}

export function fetchUpdateGift(id, gift) {
    return fetch(`/api/gift/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ gift })
    })
    .catch( () => Promise.reject({ error: 'network-error' }))
    .then( response => {
        if(!response.ok) {
            return response.json().then(error => Promise.reject(error ));
        }
        return response.json();
    });
}

export function fetchDeleteGift(id) {
    return fetch(`/api/gift/${id}`, {
        method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'network-error' }))
    .then( response => {
        if(!response.ok) {
            return response.json().then(error => Promise.reject(error ));
        }
        return response.json();
    });
}

export function fetchFriendUserData(friendUsername) {
    return fetch(`/api/friend/${friendUsername}`)
    .catch( () => Promise.reject({ error: 'network-error' }))
    .then( response => {
        if(!response.ok) {
            return response.json().then(error => Promise.reject(error ));
        }
        return response.json();
    });
}

export function fetchClaimFriendGift(friendUsername, id) {
    return fetch(`/api/friend/${friendUsername}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ id })
    })
    .catch( () => Promise.reject({ error: 'network-error' }))
    .then( response => {
        if(!response.ok) {
            return response.json().then(error => Promise.reject(error ));
        }
        return response.json();
    });
}