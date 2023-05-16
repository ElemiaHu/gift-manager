export function birthdayToString(birthday) {
    const year = birthday.getFullYear().toString();
    const month = (birthday.getMonth() + 1).toString();
    const date = birthday.getUTCDate().toString();
    return year.concat('/', month, '/', date);
}

export function daysUntilBirthday(birthday) {
    // get current date and set hours to 12am to avoid confusion
    const current = new Date();
    current.setHours(0,0,0);

    const nextBirthday = new Date(birthday);
    nextBirthday.setFullYear(current.getFullYear());
    if (nextBirthday < current) {
        nextBirthday.setFullYear(current.getFullYear() + 1);
    }

    const timeDifference = nextBirthday.getTime() - current.getTime();
    const daysUntilBirthday = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysUntilBirthday;
}