import { Request, Response } from "express";
import { getUser} from "./logic";
import ApiError from "./CustomError";

export async function doSomethingWithUser(req: Request, res: Response): Promise<void> {
    // eslint-disable-next-line no-useless-catch
    try {
        const userId = checkUserId(req.params.id);
        const user = await getUser(userId);
        res.status(200).json(user);
    }
    catch (error) {
        // I can process the error here, or throw it to a generic error catcher (like a middleware, see app.ts)
        throw error;
    }
}

export async function userDoSomething(req: Request, res: Response): Promise<void> {
    // eslint-disable-next-line no-useless-catch
    try {
        const userId = checkUserId(req.params.id);
        const user = await getUser(userId);
        const doable = req.params.doable;

        switch (doable) {
            case "illegal":
                throw new ApiError(403, "Illegal action", "ILLEGAL_ACTION", "WARNING", { user, context: { do: doable }});

            case "error":
                throw new ApiError(500, "Normal error", "INTERNAL_ERROR", "ERROR", { context: { userId: req.params.id }});
                
            case "fatal":
                throw new ApiError(500, "Fatal error", "INTERNAL_ERROR", "FATAL", { context: { userId: req.params.id }});
                
            default:
                break;
        }

        res.status(200).json({ ...user, do: doable });
    }
    catch (error) {
        // I can process the error here, or throw it to a generic error catcher (like a middleware, see app.ts)
        throw error;
    }
}

function checkUserId(userId: string): number {
    // eslint-disable-next-line no-useless-catch
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