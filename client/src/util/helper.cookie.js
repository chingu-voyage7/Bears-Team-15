class SetGetCookie {
    constructor(tokenName) {
        this.tokenName = tokenName;
    }

    /**
     * ! function sets the token with the given token name
     * @param token
     */
    setCookie = (token) => {
        // const { day, date, month, year, hours } = this.date;
        // console.log(`expires = ${day}, ${date} ${month} ${year} ${hours}:00:00 UTC`);
        // this shit doesnt work! so i used max-age
        //Expires=${day}, ${date} ${month} ${year} ${hours}:00:00 GMT
        // by default max age is set to four hours
        document.cookie = `${this.tokenName}=Bearer ${token}; Max-Age=14400000`;
    };

    /**
     * ! this function expects a string value of
     * ! token name
     * @returns jwtToken
     */
    getCookie = () => {
        // splits the cookies to an array
        const cookieSplitArr = document.cookie
            .split(' ')
            .join('=')
            .split(';')
            .join('')
            .split('=');
        // gets the index of the keyName of the cookie
        const getIndexOfKeyName = cookieSplitArr.indexOf(this.tokenName);
        // assumes that developer follows the  SCHEMA then add 2 from the index of keyName
        return cookieSplitArr[getIndexOfKeyName + 2];
    };

    /**
     * this functions deletes the token by setting the max-Age to zero
     */
    deleteCookie = () => {
        document.cookie = `${this.tokenName}=; Max-Age=0`;
    };
}

export default SetGetCookie;
