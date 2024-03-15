import express from "express";
import {  signgin, signout } from "../controllers/auth.controller.js";



const route = express.Router();


route.post("/signin", signgin);
route.post('/signout', signout);

export default route;
