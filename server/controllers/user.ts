const Game = require('../models/game.js');
const Users = require('../models/user.js');
const bcrypt = require('bcrypt');
import { Request, Response } from 'express';

async function createNewUser(req: Request, res: Response): Promise<void> {
  try {
    const user = req.body;
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      userName: user.userName,
      password: hash,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      position: user.position
    }) as User;
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: `Internal server issue: ${error}` });
  }
}

async function login(req: Request, res: Response): Promise<void | Response> {
  const { usernameOrEmail, password } = req.body;

  try {
    let user = await Users.findOne({
      $or: [{ userName: usernameOrEmail }, { email: usernameOrEmail }]
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }
    res.json({ userId: user._id, username: user.userName, email: user.email });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: `Internal server issue: ${error}` });
  }
}

async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await Users.find() as [User];
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: `Internal server issue: ${error}` });
  }
}

async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const user = await Users.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: `Internal server issue: ${error}` })
  }
}

module.exports = { createNewUser, login, getUsers, getUser }