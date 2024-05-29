import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import recipe from "./routes/recipeRoutes.js";
import user from "./routes/userRoutes.js";

const app = express();
dotenv.config()
app.use(cors());
app.use(express.json());

app.use('/recipe', recipe);
app.use('/auth', user)

const CONNECTION_URL = process.env.ATLAS_URI
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error));

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))