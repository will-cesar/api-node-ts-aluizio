import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
): any {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ message: "JWT Token is missing." });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = verify(token, authConfig.jwt.secret);
        console.log(decodedToken);
        return next();
    }
    catch (e) {
        return response.status(401).json({ message: 'Invalid JWT Token.' });
    }
}