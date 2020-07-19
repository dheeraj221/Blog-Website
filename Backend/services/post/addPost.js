import models from "../../models/";
import {errorMessages} from "../../messages";

const addPost = async (body, userId) => {
	let response = [undefined];
	const {title, description} = body;
	if (!title || !description) {
		return [errorMessages.postFieldRequired];
	}	
	try {
		const dbResponse = await models.post.create({
			title,
			description,
			user_id : userId
  	},{
  		include : [{
				model : models.user,
				attributes : ['id','username', 'email'] 
			}] 
  	});
  	response[1] = dbResponse.dataValues;
	} catch(error) {
		console.log('<====== addPost Service ======>', error);
		response[0] = errorMessages.addPost;
	}
  return response;
};

export default addPost;
