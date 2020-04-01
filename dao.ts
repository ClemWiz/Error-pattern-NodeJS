import ApiError from "./CustomError";

export default async function getUserById(userId: number): Promise<{ id: number, name: string, age: number }> {
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