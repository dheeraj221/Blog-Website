import models from "../../models";
import getUserService from './getUser';
import {errorMessages} from "../../messages";
import {isEmptyString, compareHash, hashPasswordGenerate} from "../../helper";

const updateUser = async (userId, obj) => {

	const {username, email, oldPassword, newPassword} = obj;
	const response = [undefined];

	if (isEmptyString(oldPassword)) {
		return [errorMessages.passwordNotFound];
	} 

	let [error, data] = await getUserService(userId);
  if (error) {
  	return [error];
  }

  try {	
  	const [error, isPasswordMatch] = await compareHash(oldPassword, data.password);
		if (isPasswordMatch) {
			const userUpdates = {};

			if (!isEmptyString(newPassword)) {
				const [error, newPasswordHash] = await hashPasswordGenerate(newPassword); 
				if (error) {
					return [error];
				} else {
					userUpdates.password = newPasswordHash;
				}
			}

			if (!isEmptyString(username)) {
				userUpdates.username = username;
			}

			if (!isEmptyString(email) && data.email !== email) {
				const regex = RegExp(/[a-z][0-9]+@\S+\.com+/);
				const isEmailValid = regex.test(email);
				if (!isEmailValid) {
					return [errorMessages.emailValidation];
				}
				userUpdates.email = email;
			}

		  await models.user.update(userUpdates, {where: {id: userId}});
		  // Object.assign(data,userUpdates);
		  userUpdates = {
		  	...data,
 			...userUpdates
		  }
		  response[1] = userUpdates;	
		} else {
			response[0] = errorMessages.invalidPassword;
		}
  } catch(e) {
  	console.log('<====== updateUser Service ======>', e);
		return errorMessages.userUpdation;
	}

  return response;
}

export default updateUser; 
