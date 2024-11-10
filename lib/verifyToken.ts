import jwt from "jsonwebtoken";

interface DecodedToken {
  userId: string; // Adjust this based on your JWT payload structure
  // Add other fields you expect in the token if necessary
}

export const verifyToken = (token: string): DecodedToken | null => {
  const secretKey = process.env.JWT_SECRET; // Make sure to define your secret key in .env file
  if (!secretKey) {
    throw new Error("JWT secret key not defined");
  }

  try {
    const decoded = jwt.verify(token, secretKey) as DecodedToken;
    return decoded; // Return the decoded payload if valid
  } catch (error) {
    console.error("Token verification failed:", error);
    return null; // Return null if the token is invalid
  }
};
