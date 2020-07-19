import models from "../../models";
import {errorMessages} from "../../messages";

const getAllUsers = async () => {
	const response = [undefined];
	try {
		const completeData = await models.user.findAll({
			attributes : ['id','username', 'email', 'role'],
			include : [{
				model : models.post,
				attributes : ['id','title','description', 'user_id'] 
			}]
		});
		if (completeData.length == 0) {
			response[1] = [];
		}
		response[1] = completeData;
	}	catch(error) {
		console.log('<====== getAllUsers Service ======>', error);
		response[0] = errorMessages.gettingAllUsersData;
	}
	return response;
};

export default getAllUsers;
