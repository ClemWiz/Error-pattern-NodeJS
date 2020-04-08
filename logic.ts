import { getUserById } from "./dao";
import { User } from "./models";

export async function getUser(id: number): Promise<User> {
    try {
        const user = await getUserById(id);
        // do some logic with user here
        return user;
    }
    catch (error) {
        throw error;
    }
}