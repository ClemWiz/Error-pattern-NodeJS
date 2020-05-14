import { getUserById } from "./dao";
import log from "./logger";
import ApiError from "./CustomError";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function cron() {
    return setInterval(
        async () => {
            timed("1", 1000).then(res => console.log(res));
            console.log(await getUserById(1));
            try {
                // const user = await getUserById(0);
                // console.log(user);
                console.log(await timed("2", 2000));
            } catch (error) {
                log(error);
                console.error(error);
            }
        },
        10000
    );
}
async function timed(msg: string, timer:number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(msg);
        }, timer);
    });
}