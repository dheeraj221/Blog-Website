import models from "../../models";
import getUserService from './getUser';
import {errorMessages} from "../../messages";

const createAdmin = async ({userId, role}) => {
	
	const response = [undefined];
  
	let [error, data] = await getUserService(userId);
  if (error) {
  	return [error];
  }
  // User Already have the modify request role
  if (data.role == role) {
  	return [errorMessages.userRole];
  }

  try {
  	await models.user.update({role}, {where: {id: userId}});
		data["role"] = role;
		response[1] = data;	
	} catch(e) {
  	console.log('<====== AssignRoleService ======>', e);
		response[0] = errorMessages.roleUpdation;
	}

  return response;
}

export default createAdmin; 
