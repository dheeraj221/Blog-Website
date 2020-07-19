import {errorMessages} from "../messages";

const superAdminValidation = (request, response, next) => {	
	const {id:userId, role}= request.body;
	const {id:superId, role:superRole}= request.user;
	let message;

	if (superRole !== "SUPER_ADMIN") {
		// If user is not SUPER_ADMIN
		message = errorMessages.notAuthorized;
	}

	if ((!userId || !role ) && !message) {
		message = errorMessages.roleUpdateFieldsRequired;
	} else {
		if (superId === userId || role === 'SUPER_ADMIN') {
			// If SUPER_ADMIN try to update his own role or make other SUPER_ADMIN
			message = errorMessages.invalidRoleUpdation;
		}	
	}

	if (message) {
		return response.status(401).send({message});
	}
	next();
}

export default superAdminValidation;
