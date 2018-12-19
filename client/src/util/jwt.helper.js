import jwt_decode from 'jwt-decode';

class JWTHelpers {

 decodeJWT(hash) {
  return jwt_decode(hash)
 }
}

export default JWTHelpers;