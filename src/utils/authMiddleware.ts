import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export const authenticateAdmin = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token provided, unauthorized.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload; // Verify the token
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required.' });
    }
    
    req.user = decoded; // Attach user data to the request object
    next(); // Proceed with the request
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
