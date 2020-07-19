import config from "../config";
import jwt from 'jsonwebtoken';

const authenticate = (request, response, next) => {
  const authorization = request.headers.authorization;
  const payload = authorization && authorization.split('Bearer ');
  if (!payload || !payload.length || !payload[1].length) {
    return next('Invalid token');
  } else {
    jwt.verify(payload[1], config.secretKey, (error, authData) => {
      if (error) {
        console.log("<==========ERROR : Token Verfication==========>",error);
      	return response.status(401).send("Token Expired");
    	} else {
        request.user = authData.user;
        return next();
   		}
  	});
  } 
}

export default authenticate;
