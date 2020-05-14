import { Request, Response } from "express";
import { getUser} from "./logic";
import ApiError, { ErrorLevel } from "./CustomError";

export async function doSomethingWithUser(req: Request, res: Response): Promise<void> {
        const userId = checkUserId(req.params.id);
        const user = await getUser(userId);
        res.status(200).json(user);
}

export async function userDoSomething(req: Request, res: Response): Promise<void> {
        const userId = checkUserId(req.params.id);
        const user = await getUser(userId);
        const doable = req.params.doable;

        switch (doable) {
            case "illegal":
                throw new ApiError(403, "Illegal action", "ILLEGAL_ACTION", ErrorLevel.Warning, { user, type: "userAction", context: { do: doable }});

            case "error":
                throw new ApiError(500, "Normal error", "INTERNAL_ERROR", ErrorLevel.Error, { type: "errorLevel", context: { userId: req.params.id }});
                
            case "fatal":
                throw new ApiError(500, "Fatal error", "INTERNAL_ERROR", ErrorLevel.Fatal, { type: "errorLevel", context: { userId: req.params.id }});
                
            default:
                break;
        }

        res.status(200).json({ ...user, do: doable });
}

function checkUserId(userId: string): number {
        const parsedId = parseInt(userId, 10);
    
        if (isNaN(parsedId)) {
            throw new ApiError(400, "Invalid user ID", "INVALID_USER_ID", ErrorLevel.Warning, { type: "User", context: { userId }});
        }
        else return parsedId;
}