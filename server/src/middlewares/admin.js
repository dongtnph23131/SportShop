import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../routers/admin/auth";

export const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "You need to login!",
    });
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "You are not authenticated!" });

  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) return res.status(403).json({ message: "Token is not valid!" });

    //@ts-ignore
    req.user = decoded;
    next();
  });
};
