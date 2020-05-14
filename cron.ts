import { getUserById } from "./dao";
import log from "./logger";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function cron() {
    return setInterval(
        async () => {
            try {
                const user = await getUserById(0);
                console.log(user);
            } catch (error) {
                log(error);
                console.error(error);
            }
        },
        10000
    );
}
