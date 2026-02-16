import express from "express";
import { uploadImage, deleteImage } from "../controllers/upload.controller";

const uploadRouter = express.Router();

uploadRouter.post("/upload", uploadImage);
uploadRouter.delete("/upload", deleteImage);

export default uploadRouter;
