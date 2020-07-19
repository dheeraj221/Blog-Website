import {sendResponse} from "../helper";
import {successMessages} from "../messages";
import getAllUsersService from '../services/user/getAllUsers';
import getUserService from '../services/user/getUser';
import registerUserService from '../services/user/registerUser';
import updateUserService from '../services/user/updateUser';
import createAdminService from '../services/user/createAdmin';
import removeUserService from '../services/user/removeUser';
import userLoginService from '../services/user/userLogin';

class UserController {
  static async getAllUsers(request, response) {
    const [error, data] = await getAllUsersService();  
    const message = successMessages.completeData;
    sendResponse({response, data, error, message});
  }
  
  static async getUser(request, response) {
    const [error, data] = await getUserService(request.params.id);
    const message = successMessages.dataFound;
    sendResponse({response, data, error, message});
  }

  static async userRegister(request, response) {
    const [error, data] = await registerUserService(request.body);
    const message = successMessages.registered; 
    sendResponse({response, data, error, message});
  }

  static async updateUser(request, response) {
    const id = request.params.id;
    const [error, data] = await updateUserService(id, request.body);
    const message = successMessages.updated;
    sendResponse({response, data, error, message});  
  }

  static async removeUser(request, response) {
    const [error, data] = await removeUserService(request.params.id);
    const message = successMessages.deleted; 
    sendResponse({response, data, error, message});
  }

  static async userLogin(request, response) {
    const [error, data] = await userLoginService(request.body);
    const message = successMessages.loggedIn;
    sendResponse({response, data, error, message});
  }

  static async createAdmin(request, response) {
    const {id: userId, role} = request.body;
    const [error, data] = await createAdminService({userId, role});
    const message = successMessages.roleUpdated;
    sendResponse({response, data, error, message});
  }
};

export default UserController; 
