import { birthdayToString, daysUntilBirthday } from "./birthday";

function BirthdayInfo({ birthday, person }) {
    return (
        <div className="birthday-info-container">
            <div className="birthday">{ birthdayToString(birthday) }</div>
            <div className="countdown">There are <span>{daysUntilBirthday(birthday)}</span> days till {person} next birthday.</div> 
        </div>
    )
}

export default BirthdayInfo;