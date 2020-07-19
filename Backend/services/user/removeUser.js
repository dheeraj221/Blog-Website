import models from "../../models";
import getUserService from './getUser';
import {errorMessages} from "../../messages";

const removeUser = async (userId) => {
	const response = [undefined];
		
	const [error, data] = await getUserService(userId);
  if (error) {
  	return [error];
  }   
	try {
  	await models.user.destroy({where: {id : userId}});	
		response[1] = data;
	} catch(e) {
		console.log('<====== removeUser Service ======>', e);
		response[0] = errorMessages.userDeletion;
	}
	return response;
}

export default removeUser;
