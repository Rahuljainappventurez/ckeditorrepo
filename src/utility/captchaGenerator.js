const generateRandomChar = (length, characters) => {
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }

    return result;
}


export const generateCaptcha = () => {
    const digits = "0123456789";
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const captchaLength = 6;

    const randomDigits = generateRandomChar(captchaLength, digits);
    const randomLetters = generateRandomChar(captchaLength, letters);

    // Mix digits and letters randomly
    let mixedCaptcha = "";
    for (let i = 0; i < captchaLength; i++) {
        const randomSelector = Math.floor(Math.random() * 2);
        if (randomSelector === 0) {
            mixedCaptcha += randomDigits[i];
        } else {
            mixedCaptcha += randomLetters[i];
        }
    }

    return mixedCaptcha;
}