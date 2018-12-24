class SetGetCookie {
 constructor(keyName) {
  this.keyName = keyName;
 }

 setCookie = (value) => {
  // const { day, date, month, year, hours } = this.date;
  // console.log(`expires = ${day}, ${date} ${month} ${year} ${hours}:00:00 UTC`);
  // this shit doesnt work! so i used max-age
  //Expires=${day}, ${date} ${month} ${year} ${hours}:00:00 GMT
  // by default max age is set to four hours
  document.cookie = `${this.keyName}=${value}; Max-Age=14,400`;
 }

 /**
  * ! this function expects a string value of
  * ! token name
  * @param tokenName 
  */
 getCookie = () => {
  // splits the cookies to an array
  const cookieSplitArr = document.cookie.split(' ').join('=').split(';').join('').split('=');
  // gets the index of the keyName of the cookie
  const getIndexOfKeyName = cookieSplitArr.indexOf(this.keyName);
  // assumes that developer follows the BEARER SCHEMA then add 2 from the index of keyName
  return cookieSplitArr[getIndexOfKeyName + 2]
 }

 // TODO: finish this method will delete a cookie
 deleteCookie = (key) => {
  document.cookie = `${key}=; Max-Age=0`;
 }
}

export default SetGetCookie;