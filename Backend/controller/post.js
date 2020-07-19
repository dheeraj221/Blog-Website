import {sendResponse} from "../helper";
import {successMessages} from "../messages";
import getAllPostsService from '../services/post/getAllPosts';
import getPostService from '../services/post/getPost';
import addPostService from '../services/post/addPost';
import updatePostService from '../services/post/updatePost';
import removePostService from '../services/post/removePost';

class PostController {
  static async getAllPosts(request, response) {
    const userId = request.params.id;
    const [error, data] = await getAllPostsService(userId);
    const message = successMessages.completeData;
    sendResponse({response, data, message, error});
  }

  static async getPost(request, response) {
    const {post_id:postId, id:userId}= request.params;
    const [error, data] = await getPostService(postId, userId);
    const message = successMessages.postFound;
    sendResponse({response, data, message, error}); 
  }

  static async addPost(request, response) {
    const userId = request.params.id;
    const [error, data] = await addPostService(request.body, userId);
    const message = successMessages.postAdded; 
    sendResponse({response, data, message, error});
  }

  static async updatePost(request, response) {
    const {post_id:postId, id:userId}= request.params;
    const [error, data] = await updatePostService(postId, userId, request.body);
    const message = successMessages.postUpdated;
    sendResponse({response, data, message, error});
  }

  static async removePost(request, response) {
    const postId = request.params.post_id;
    const userId = request.params.id;
    const [error, data] = await removePostService(postId, userId);
    const message = successMessages.postDeleted;
    sendResponse({response, data, message, error});
  }
};

export default PostController;
