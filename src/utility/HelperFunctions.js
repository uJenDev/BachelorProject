// function that capitalizes the first letter of every word in a string
const capitalize = (str) => {
    if (typeof str !== 'string') return str;
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const slugFromTitle = (title) => {
    return title.toLowerCase().replace(/ /g, '-');
}

export {capitalize, slugFromTitle};