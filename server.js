const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

const sessions = require('./sessions');
const gifts = require('./gifts');
const users = require('./users');

app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    res.json({ username });
});

app.post('/api/session', (req, res) => {
    const { username } = req.body;

    if(users.usernameValidation(username) === 'invalid-username') {
        res.status(400).json({ error: 'required-username' });
        return;
    } else if(users.usernameValidation(username) === 'not-allowed') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    } else {
        const sid = sessions.addSession(username);
        res.cookie('sid', sid);

        if(!users.getUserData(username)) {
            const userData = {
                birthday: '',
                giftList: gifts.makeGiftList(),
            }
            users.addUserData(username, userData);
        }

        const userData = users.getUserData(username);

        res.json({ username, userData });
    }
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
  
    if(sid) res.clearCookie('sid');
    if(username) sessions.deleteSession(sid);

    res.json({ username });
});

// get user data
app.get('/api/user', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const userData = users.getUserData(username);
    const birthday = userData.birthday;
    const giftList = userData.giftList.getAllGifts();

    res.json({ username, birthday, giftList });
});

app.post('/api/gift', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { gift } = req.body;

    if(!gift) {
        res.status(400).json({ error: 'required-gift' });
        return;
    }

    const giftList = users.getUserData(username).giftList;
    const id = giftList.addGift(gift);

    res.json(giftList.getGift(id));
})

app.patch('/api/birthday', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { birthday } = req.body;
    if(users.birthdayValidation(birthday)) users.updateBirthday(username, birthday);
    else {
        res.status(400).json({ error: 'required-valid-birthday' });
        return;
    }

    res.json({ username, birthday });
})

app.put('/api/gift/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const giftList = users.getUserData(username).giftList;
    const { id } = req.params;
    const { gift } = req.body;

    if(!gift) {
        res.status(400).json({ error: 'required-gift' });
        return;
    }
    if(!giftList.contains(id)) {
        res.status(404).json({ error: 'no-such-id' });
        return;
    }
    // if the gift item has already be claimed, users cannot make changes
    if(giftList.getClaimed(id) !== 'dog') {
        res.status(406).json({ error: 'change-forbidden' });
        return;
    }

    giftList.updateGiftContent(id, gift);

    res.json(giftList.getGift(id));
});

app.delete('/api/gift/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const giftList = users.getUserData(username).giftList;
    const { id } = req.params;

    if(!giftList.contains(id)) {
        res.status(404).json({ error: 'no-such-id' });
        return;
    }

    giftList.deleteGift(id);
    res.json({ success: id });
})

// get friend's user data
app.get('/api/friend/:friendUsername', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    if(!req.params) {
        res.status(400).json({ error: 'required-friend-username' });
        return;
    }
    
    const { friendUsername } = req.params;

    if(!users.getUserData(friendUsername) || friendUsername === username) {
        res.status(404).json({ error: 'no-such-username' });
        return;
    }

    const userData = users.getUserData(friendUsername);
    const birthday = userData.birthday;
    const giftList = userData.giftList.getAllGifts();

    res.json({ friendUsername, birthday, giftList });

});

app.patch('/api/friend/:friendUsername', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { friendUsername } = req.params;
    const { id } = req.body;

    const giftList = users.getUserData(friendUsername).giftList;
    if(!giftList || !giftList.contains(id)) {
        res.status(404).json({ error: 'no-such-id' });
        return;
    }

    giftList.claim(username, id);

    res.json(giftList.getGift(id));
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));