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

const calculateCostPerUnit = (dimensions, material) => {
    const { height, width, length } = dimensions;

    // Extract density from material properties
    const densityProperty = material.properties.find(property => property.slug === 'density');
    const density = densityProperty ? densityProperty.value : null;

    if (!density) {
        throw new Error('Density not found in material properties');
    }

    // Extract price per kg from material
    const pricePerKg = material.pricePerKg;
    
    // Calculate volume in cm^3
    const volume = height * width * length;

    // Calculate weight in g (1 g/cm^3 = 1 g)
    const weightInGrams = volume * density;

    // Convert weight to kg (1 kg = 1000 g)
    const weightInKg = weightInGrams / 1000;

    // Calculate cost per unit in Norwegian krones
    const costPerUnit = weightInKg * pricePerKg;

    return costPerUnit;

}

export {capitalize, slugFromTitle, valdiateEmail, validatePassword, secondsToHMS, calculateCostPerUnit};