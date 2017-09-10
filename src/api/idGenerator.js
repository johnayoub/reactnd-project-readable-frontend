const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateId = () => {
    const keyLength = 22;
    let key = '';

    const keyChars = [
        ...Array.from(new Array(10).keys()).map(x => x + 48),
        ...Array.from(new Array(26).keys()).map(x => x + 65),
        ...Array.from(new Array(26).keys()).map(x => x + 97)
    ];

    for (let i = 0; i < keyLength; i++) {
        const randomNumber = generateRandomNumber(0, keyChars.length - 1);

        key += String.fromCharCode(keyChars[randomNumber]);
    }

    return key;
};