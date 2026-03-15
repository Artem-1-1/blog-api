import bcrypt from  "bcryptjs";
import jwt from "jsonwebtoken";
import { matchedData } from 'express-validator';
import * as userQueries from "../db/user.queries.js";

const createToken = (id, role) => {
  return jwt.sign({id, role}, process.env.SECRET, { expiresIn: '1d' })
}

export const signUpUser = async(req, res) => {
  try {
    const { username, password, role } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userQueries.createUser(username, hashedPassword, role);
    const token = createToken(user.id, user.role)
    res.status(201).json({username: user.username,role: user.role, token})
  } catch(error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong on our side' });
  }
}

export const logInUser = async(req, res) => {
  try {
    const { username, password } = matchedData(req);
    const user = await userQueries.getUserByUsername(username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = createToken(user.id, user.role); 
    res.json({username: user.username, role: user.role, token})
  } catch(error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong on our side' });
  }
}