class SetGetCookie {
 constructor(keyName) {
  this.keyName = keyName;
 }

 setCookie = (value) => {
  document.cookie = `${this.keyName}=${value};`;
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
 deleteCookie = () => {
  document.cookie = "tokenizer=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
 }
}

export default SetGetCookie;