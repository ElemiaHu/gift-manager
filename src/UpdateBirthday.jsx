import { useState } from "react";

function UpdateBirthday({ onUpdateBirthday }) {
    const [ birthday, setBirthday ] = useState('');
    return (
        <div className="update-birthday">
            <input type="date"
                onInput={(e) => setBirthday(e.target.value)}
            />
            <button onClick={() => {
                onUpdateBirthday(birthday);
            }}>Update</button>
        </div>
    )
}

export default UpdateBirthday;