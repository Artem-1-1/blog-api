import bcrypt from  "bcryptjs";
import { matchedData } from 'express-validator';
import * as userQueries from "../db/user.queries.js";

export const signUpUser = async(req, res) => {
  try {
    const { username, password } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userQueries.createUser(username, hashedPassword);
    res.status(201).json({ message: 'User created!'});
  } catch(error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong on our side' });
  }
}

export const logInUser = async(req, res) => {
  res.json({mssg: 'login user'})
}