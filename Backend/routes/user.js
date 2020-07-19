import express from "express";
import userController from '../controller/user';
import authenticate from "../middlewares/authenticate";
import validateRole from "../middlewares/validateRole";
import superAdminValidation from "../middlewares/superAdminValidation";

const router = express.Router();

router.get('/', authenticate, validateRole, userController.getAllUsers);
router.get('/:id', authenticate, validateRole, userController.getUser);

router.post('/sign-up', userController.userRegister);
router.post('/login', userController.userLogin);

router.put('/create-admin', authenticate, superAdminValidation, userController.createAdmin);
router.put('/:id', authenticate, validateRole, userController.updateUser);

router.delete('/:id', authenticate, validateRole, userController.removeUser);


export default router;
