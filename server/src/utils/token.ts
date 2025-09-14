import { Request, Response, NextFunction } from 'express';
import 'express'
import jwt, { JwtPayload } from 'jsonwebtoken';

interface jwtPayLoad extends JwtPayload {
    userId: string;
    role?: 'user' | 'admin';
}

const JWT_SECRET = process.env.JWT_SECRET || 'mysuperheroismydad';

export const generateToken = (payload: jwtPayLoad): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Extend Express Request for TS
declare module 'express' {
    interface Request {
        userId?: string;
        role?: 'user' | 'admin';
    }
}

// Middleware to verify JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    console.log('token',token)

    try {
        const verify = jwt.verify(token, JWT_SECRET) as jwtPayLoad;
        req.userId = verify.userId;
        req.role = verify.role;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Middleware to check admin role
export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
    if (req.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    next();
};
