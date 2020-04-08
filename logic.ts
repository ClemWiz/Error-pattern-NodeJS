import { getUserById } from "./dao";
import { User } from "./models";

export async function getUser(id: number): Promise<User> {
    // eslint-disable-next-line no-useless-catch
    try {
        const user = await getUserById(id);
        // do some logic with user here
        return user;
    }
    catch (error) {
        throw error;
    }
}