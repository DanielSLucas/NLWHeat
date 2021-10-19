import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void | Response {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: 'Invalid token!',
    });
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET);

    request.user_id = sub as string;

    return next();
  } catch (error) {
    return response.status(401).json({
      errorCode: 'Expired token!',
    });
  }
}
