import ApiError from "./CustomError";
import * as Sentry from "@sentry/node";

Sentry.init({
    dsn: `https://2835f89bb46f4f8db77335feab5da2a4@sentry.shopopop.com/6`
});

export default function log(error: ApiError) {
    const user = error.data?.user;
    const context = error.data?.context;
    Sentry.withScope(scope => {
        scope.setLevel(Sentry.Severity.fromString(error.level.toLowerCase()));
        if (user) {
            scope.setUser({
                id: user.id.toString(10),
                name: user.name
            });
        }
        if (context) scope.setExtra("context", context);
        Sentry.captureException(error);
    })
    return;
}