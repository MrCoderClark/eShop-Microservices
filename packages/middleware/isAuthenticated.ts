import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { prisma } from '@packages/libs/prisma';

const isAuthenticated = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies.access_token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorized! Missing Token.' });
    }

    // verify token
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error(
        'ACCESS_TOKEN_SECRET is not defined in environment variables.'
      );
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as {
      id: string;
      role: 'user' | 'seller';
    };

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: 'Forbidden! Invalid token.' });
    }

    const account = await prisma.users.findUnique({
      where: { id: decoded.id },
    });

    req.user = account;

    if (!account) {
      return res.status(404).json({ message: 'Account not found.' });
    }

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized! Token expired or invalid.',
    });
  }
};

export default isAuthenticated;
