import { Request, Response, NextFunction } from "express";
import { getUser} from "./logic";
import ApiError from "./CustomError";

export async function doSomethingWithUser(req: Request, res: Response) {
    try {
        // do some control code
        if (req.params.id === "fatal") {
            throw new ApiError(500, "Fatal error", "INTERNAL_ERROR", "FATAL", { context: { userId: req.params.id }});
        }
        if (req.params.id === "error") {
            throw new ApiError(500, "Normal error", "INTERNAL_ERROR", "ERROR", { context: { userId: req.params.id }});
        }
        
        const userId = checkUserId(req.params.id);
        const user = await getUser(userId);
        res.status(200).json(user);
    }
    catch (error) {
        // I can process the error here, or throw it to a generic error catcher (like a middleware, see app.ts)
        throw error;
    }
}

export async function userDoSomething(req: Request, res: Response) {
    try {
        const userId = checkUserId(req.params.id);
        const user = await getUser(userId);
        const doable = req.params.doable;
        if (doable === "illegal") {
            throw new ApiError(403, "Illegal action", "ILLEGAL_ACTION", "ERROR", { user, context: { do: doable }});
        }
        res.status(200).json({ ...user, do: doable });
    }
    catch (error) {
        // I can process the error here, or throw it to a generic error catcher (like a middleware, see app.ts)
        throw error;
    }
}

function checkUserId(userId: string): number {
    try {
        const parsedId = parseInt(userId, 10);
    
        if (isNaN(parsedId)) {
            throw new ApiError(400, "Invalid user ID", "INVALID_USER_ID", "WARNING", { context: { userId }});
        }
        else return parsedId;
    }
    catch (err) {
        throw err;
    }
}