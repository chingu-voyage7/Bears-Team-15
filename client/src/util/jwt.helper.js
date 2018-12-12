import jwt_decode from 'jwt-decode';

class JWTHelpers {

 decodeJWT(hash) {
  console.log(hash)
  return jwt_decode(hash)
 }
}

export default JWTHelpers;