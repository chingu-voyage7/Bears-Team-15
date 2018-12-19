class SetGetCookie {
 constructor(keyName, date = {}) {
  this.keyName = keyName;
  this.date = date;
  this.test = this.test();
 }

 test = () => {
  const date = new Date();
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = weeks[date.getDay()];
  const month = months[date.getMonth()]
  const hours = date.getHours() + 4; // 4 is dynamically added
  // console.log('day:', day);
  // console.log('day of the month:', date.getDate());
  // console.log('month:', month);
  // console.log('Year:', date.getFullYear());
  // console.log('hours', hours)

  this.date = {
   day,
   date: date.getDate(),
   month,
   year: date.getFullYear(),
   hours,
  }
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
 deleteCookie = () => {
  document.cookie = "tokenizer=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
 }
}

export default SetGetCookie;