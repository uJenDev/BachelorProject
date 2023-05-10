// function that capitalizes the first letter of every word in a string
const capitalize = (str) => {
    if (typeof str !== 'string') return str;
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const slugFromTitle = (title) => {
    return title.toLowerCase().replace(/ /g, '-');
}

const valdiateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(password);
}

const secondsToHMS = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds - (hours * 3600)) / 60)
    const secondsLeft = seconds - (hours * 3600) - (minutes * 60)
    return `${hours}h ${minutes}m ${secondsLeft}s`
}

export {capitalize, slugFromTitle, valdiateEmail, validatePassword, secondsToHMS};