import ApiError from "./CustomError";
import { User } from "./models";

export async function getUserById(userId: number): Promise<User> {
    return new Promise((resolve, reject) => {
        if (!userId || userId === 0) {
            const err = new ApiError(404, "User not found", "USER_NOT_FOUND", "INFO");
            reject(err);
        }
        else {
            resolve({
                id: userId,
                name: "John Doe",
                age: 30
            })
        }
    });
}
