import models from "../../models";
import getPostService from './getPost';
import {errorMessages} from "../../messages";

const updatePost = async (postId, userId, postUpdates) => {
	const response = [undefined];

	if (!postUpdates) {
		return [errorMessages.descriptionFieldRequired];
	}

	const [error, data] = await getPostService(postId, userId);
  if (error) {
  	return [error];
  }   
	try {
	  await models.post.update(
	  	postUpdates,
      {where: {id: postId, user_id : userId }}
	  );

		// Object.assign(data,postUpdates);
		postUpdates = {...data, ...postUpdates};
	  response[1] = data;
  } catch(e) {
  	console.log('<====== updatePost Service ======>', e);
		return [errorMessages.postUpdation];
	}
  return response;
}

export default updatePost;
