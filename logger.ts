// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('./package.json');
import ApiError from "./CustomError";
import * as Sentry from "@sentry/node";

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: version
});

export default function log(error: ApiError): void {
    const user = error.data?.user;
    const type = error.data?.type ? error.data?.type : "unknown";
    const context = error.data?.context;
    return Sentry.withScope(scope => {
        const level = error.level ? error.level.toLowerCase() : "fatal";
        scope.setLevel(Sentry.Severity.fromString(level));
        scope.setTag("type", type);
        if (user) {
            scope.setUser({
                id: user.id.toString(10),
                name: user.name
            });
        }
        if (context) scope.setExtra("context", context);
        Sentry.captureException(error);
    });
}