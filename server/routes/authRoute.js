import express from "express";
import { signup } from "../controllers/authController.js";

const router = express.Router();

router.get( '/', (req, res)=>{
    res.json({ message : "This is the authrouter"})
})

router.post('/sign-up', signup)

export default router;