import models from "../../models";
import {errorMessages} from "../../messages";
import getPostService from './getPost';

const removePost = async (postId, userId) => {
	const response = [undefined];
	const [error, data] = await getPostService(postId, userId);
  if (error) {
  	return [error];
  }    
	try {
  	await models.post.destroy({
  		where: {
  			id: postId, 
  			user_id : userId
  		}
  	});	
		response[1] = data;
	} catch(e) {
    console.log('<====== removePost Service ======>', e);
		response[0] = errorMessages.postDeletion;
	}
	return response;
}

export default removePost;
