import models from "../../models";
import {errorMessages} from "../../messages";

const getUser = async (userId) => {
	const response = [undefined];
	try {
		const userData = await models.user.findOne({
			include : [{
				model : models.post,
				attributes : ['id','title','description', 'user_id'] 
			}],
			where : {id : userId}
		});
		if (userData == null) {
			response[0] = errorMessages.dataNotFound;
		} else {
		  response[1] = userData.dataValues;
		}
	} catch (error) {
		console.log('<====== getUser Service ======>', error);
		response[0] = errorMessages.getUserService;
	}
	
	return response;
};

export default getUser;
