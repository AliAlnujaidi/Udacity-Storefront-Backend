import express from 'express';
import jwt from 'jsonwebtoken';

export const requireAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const token = req.body.token;
  //check if there is a access_token, if not go to else...
  if (!token) {
    res.status(401).json({ message: 'Token is missing' });
  }
  //check if the token is valid
  try {
    //needed to use any beacuse the jwt.verify() returns a object and we need to access the user property, coludn't find a way to do it without using any
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    
    //add the user property to the request
    req.body.user_id = decoded.user;

    //if the token is valid, go to next middleware
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};
