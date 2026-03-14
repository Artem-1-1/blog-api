import { Router } from "express";
import * as user from "../controllers/user.js";
import { userValidateSignUp, userValidateLogIn } from "../middleware/validators.js";
import { handleValidation } from "../middleware/handleValidator.js";

const router = Router();

router.post("/signup", userValidateSignUp, handleValidation, user.signUpUser);

router.post("/login", userValidateLogIn, handleValidation, user.logInUser);

export default router;