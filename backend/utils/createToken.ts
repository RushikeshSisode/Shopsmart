import { Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";

interface TokenPayload {
  userId: string;
}

const generateToken = (res: Response, userId: string): string => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

const secureCompare = (str1: string, str2: string): boolean => {
  try {
    const buf1 = Buffer.from(str1, "utf8");
    const buf2 = Buffer.from(str2, "utf8");

    if (buf1.length !== buf2.length) {
      return false;
    }

    return crypto.timingSafeEqual(buf1, buf2);
  } catch (error) {
    return false;
  }
};

export { generateToken, verifyToken, secureCompare };
export default generateToken;