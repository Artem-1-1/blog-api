import { body } from "express-validator";
import { getUserByUsername } from "../db/user.queries.js"

export const userValidateSignUp = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 4, max: 50 }).withMessage("Username must have at least 4 letter and no more than 50 letter")
    .custom(async (value) => {
      const user = await getUserByUsername(value);
      if (user) {
        throw new Error("Username is already taken");
      }
      return true;
    }),

  body("password")
    .trim()
    .notEmpty().withMessage("Password must be not empty")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .isLength({ min: 8 }).withMessage("Password must have at least 8 symbols"),

  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    })
]

export const userValidateLogIn = [
  body("username")
    .trim()
    .notEmpty().withMessage("Username must be not empty")
    .isLength({ min: 4 }).withMessage("Username must be least 4 symbols"),
    
  body("password")
    .trim()
    .notEmpty().withMessage("Password must be not empty")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/).withMessage("Password must contain at least one number")
    .isLength({ min: 8 }).withMessage("Password must have at least 8 symbols")
]