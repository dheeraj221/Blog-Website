import models from "../../models";
import {errorMessages} from "../../messages";


const getPost = async (postId, userId) => {
	const response = [undefined];	
	try {
		const postData = await models.post.findOne({
  		attributes : ['id','title','description', 'user_id'],
  		include : [{
  			model : models.user,
  			attributes : ['id','username', 'email']
  		}],
  		where: {
    		user_id : userId,
    		id : postId
    	}
		});
		
		if (postData == null) {
		  response[1] = errorMessages.postNotFound;
		} else {
		  response[1] = postData.dataValues;
		}
	} catch(error) {
		console.log('<====== getPost Service ======>', error);
		response[0] = errorMessages.getPost;
	}
	return response;
};

export default getPost;
