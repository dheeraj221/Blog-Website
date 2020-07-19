import userRoutes from "./user";
import postRoutes from "./post";

const initiateRoutes = (app) => {	
	app.use('/users', userRoutes);
	app.use('/users/:id/posts', postRoutes);
};

export default initiateRoutes;
