import models from "../../models/";
import {errorMessages} from "../../messages";

const getAllPosts = async (userId) => {
	const response = [undefined];
	try {
		const completeData = await models.post.findAll({
			attributes : ['id','title','description', 'user_id', 'createdAt', 'updatedAt'],
			include : [{
				model : models.user,
				attributes : ['id','username', 'email']
			}],
			where: {
				user_id : userId,
			}
		});
		if (completeData.length == 0) {
			response[1] = [];
		}
		response[1] = completeData;
	} catch(e) {
		console.log('<====== getAllPosts Service ======>', e);
		response[0] = errorMessages.getAllposts;
	}

	return response;
};

export default getAllPosts;
