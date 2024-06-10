export const validateEmail = (email) => {
    const regex =
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);

};

export const getinitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = ""

    for (let i = 0; i< Math.min(words.length, 2); i++) {
        initials += words[i][0].toUpperCase();
    }
    return initials;
}