class SetGetCookie {

 setCookie(key, value) {
  document.cookie = `${key}=${value};`;
 }

 /**
  * ! this function expects a string value of
  * ! token name
  * @param tokenName 
  */
 getCookie(keyName) {
  // splits the cookies to an array
  const cookieSplitArr = document.cookie.split(' ').join('=').split(';').join('').split('=');
  // gets the index of the keyName of the cookie
  const getIndexOfKeyName = cookieSplitArr.indexOf(keyName);
  // assumes that developer follows the BEARER SCHEMA then add 2 from the index of keyName
  return cookieSplitArr[getIndexOfKeyName + 2]
 }

 deleteCookie() {
  document.cookie = "tokenizer=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
 }
}

export default SetGetCookie;