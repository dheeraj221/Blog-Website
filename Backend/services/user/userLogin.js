import jwt from 'jsonwebtoken';
import config from "../../config";
import models from "../../models";
import {errorMessages} from "../../messages";
import {isEmptyString, compareHash} from "../../helper";

const userLogin = async ({email, password}) => {
	const response = [undefined];
	
	if (isEmptyString(email) || isEmptyString(password)) {
		return [errorMessages.loginFieldsRequired];
	}

	try {	
		const userData = await models.user.findOne({where : {email}});

		if (userData) {
			const hashPassword = userData.dataValues.password; 
			const [error, check] =  await compareHash (password, hashPassword);
			
			if (check) {
				const {id, username, role} = userData.dataValues;
				const user = {id, username, role};
			  const accessToken = await jwt.sign(
			  	{user}, 
			  	config.secretKey,
			  	{expiresIn : config.expireIn}
			  );  	
			  response[1] = {id, accessToken};
			} else {
				response[0] = errorMessages.invalidPassword;
			} 
		} else {
			response[0] = errorMessages.userNotRegistered;
		}
	} catch(error) {
		console.log("<======User Login Error======>", error);
		response[0] = errorMessages.login;
	}	
	
	return response;
}

export default userLogin;
