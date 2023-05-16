import { useState } from "react";
import gift from "./media/gift.svg";

function Login({ onLogin, error }) {
    const [ username, setUsername ] = useState('');

    return (
        <div className="login-container">
            <div className="login-intro">
                <div>Gift Manager</div>
                <img src={gift} className="login-image" alt="illustration of a gift"/>
            </div>

            <div className="login-form">
                <div className="error">{error}</div>
                <input type="text" placeholder="Enter Username"
                    className="login-input" value={username}
                    onInput={(e) => setUsername(e.target.value)}/>
                <button className="login-button"
                        onClick={() => {
                            onLogin(username);
                            setUsername('');
                        }}>Login</button>
            </div>

            <div className="intro">
                <div>Gift Manager is a powerful tool to manage your gift options,</div>
                <div>check others' gift options,</div>
                <div>and interact with families and friends.</div>
            </div>
            
        </div>
    )
}

export default Login;