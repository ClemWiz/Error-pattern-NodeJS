import ApiError from "./CustomError";
import * as Sentry from "@sentry/node";

Sentry.init({
    dsn: process.env.SENTRY_DSN
});

export default function log(error: ApiError) {
    const user = error.data?.user;
    const context = error.data?.context;
    Sentry.withScope(scope => {
        if (error.level) scope.setLevel(Sentry.Severity.fromString(error.level.toLowerCase()));
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