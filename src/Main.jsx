import { useState } from "react";
import Personal from "./Personal";
import Friends from "./Friends";

function Main({ onLogout, username }) {
    const [ page, setPage ] = useState('personal');

    return (
        <div className="main-container">
            <div className="guide-container">
                <div className="username">{username}</div>
                <button className="logout-button" onClick={() => { onLogout();}}>Logout</button>
            </div>

            <div className="page-selector">
                <button className="personal-button" onClick={() => setPage('personal')}>Personal Space</button>
                <button className="friends-button" onClick={() => setPage('friends')}>Find a Friend</button>
            </div>

            <div className="page-container">
                { page === 'personal' && <Personal onLogout={onLogout}/> }
                { page === 'friends' && <Friends onLogout={onLogout} username={username}/>}
            </div>
        </div>
    )
}

export default Main;