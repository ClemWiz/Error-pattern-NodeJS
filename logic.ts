import { getUserById } from "./dao";
import * as orm from "./generator";
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

export async function demoTrans(userId: number) {
    let user: User;
    try {
        const gen = orm.transaction(userId);
        user = (await gen.next()).value;
        user = (await gen.next()).value;
        // await gen.throw(new Error("Transaction failed"));
        user = (await gen.next()).value;
        
        gen.return("commit").then(res => console.log(res.value));
        return user;
        
    } catch (error) {
        user = orm.rollback();
        throw error;
    }
}
