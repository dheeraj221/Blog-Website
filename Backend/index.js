import express from "express";
import cors from "cors";
import initiateRoutes from "./routes";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

initiateRoutes(app);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
}); 
