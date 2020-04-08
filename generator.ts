import { getUserById, updateUserById } from "./dao";
import { User } from "./models";

export async function* transaction(id: number): AsyncGenerator<User, any, User> {
    try {
        yield await getUserById(id);
        yield await updateUserById(id, 31);
        yield await updateUserById(id, 31, "Jane Doe");
        return "Transaction succeeded";
    } catch (error) {
        throw error;
    }
}

export function rollback(): User {
    return { id: 1, name: "John Doe", age: 30 }
}