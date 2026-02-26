import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// returns a user's id based on their current jwt
export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!); // TODO: the ":any" is bad practice
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
