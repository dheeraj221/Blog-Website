import getUserService from '../services/user/getUser';
import {errorMessages} from '../messages';

const validateRole = async (request, response, next) => {
	let message;
	const {user, params} = request;
	const {id: paramUserId} = params;
	const {id: userId, role} = user;
	// GET-ALL-USERS data request
	if (!paramUserId) {
		if (role === 'USER') {
			return response.status(401).send({message: "Invalid Access"});
		}
		return next();	
	}
	// GET, PUT, DELETE requests
	if (paramUserId === userId) {	
		if (request.method === 'DELETE' && role === "SUPER_ADMIN") {
			message = errorMessages.superAdminAlwaysRequired;
		}
	} else {	
		if (role === 'USER') {
			message = errorMessages.userAccessOthersData;
		} else {
			const [error, data] = await getUserService(paramUserId);
			if (error) {
				console.log("<====GETUSER ERROR====>", error);	
				message = errorMessages.internalServer;
			} else {
				if (data.role === "SUPER_ADMIN") {
					message = errorMessages.adminModifySuperadmin;
				}
			} 
		}
	}

	if (message) {
		return response.status(401).send({message});
	}
	next();
}

export default validateRole;
