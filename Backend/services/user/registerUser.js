import bcrypt from "bcrypt";
import models from "../../models";
import {errorMessages} from "../../messages";
import {isEmptyString, hashPasswordGenerate} from "../../helper";

const registerUser = async ({username, email, password, confirmPassword}) => {
	const response = [undefined];

	// Required Field Validation
	if (isEmptyString(username) || isEmptyString(email) || isEmptyString(password)) {
		return [errorMessages.registerUserFieldsRequired];
	}

	// Pattern for email Validation
	const regex = RegExp(/[a-z][0-9]+@\S+\.com+/);
	const isEmailValid = regex.test(email);
	
	if (!isEmailValid) {
		return [errorMessages.emailValidation];
	}

	const [error, passwordHash] = await hashPasswordGenerate(password);
	if (passwordHash) {
		try {
			const dbResponse = await models.user.create({
				username,
				email,
				password : passwordHash
			});
	  	response[1] = dbResponse.dataValues;
		} catch(e) {
			console.log('<====== registerUser Service ======>', e);
			response[0] = errorMessages.signUp;
		}
	} else {
		response[0] = error;
	}
  return response;
};

export default registerUser;
