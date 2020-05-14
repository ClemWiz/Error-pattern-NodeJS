export default class ApiError extends Error {
    public statusCode: number;
    public message: string;
    public code: string;
    public level: string;
    public data?;

    constructor(statusCode: number, message: string, code: string, level: ErrorLevel, data?) {
        super(message);
        // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, ApiError.prototype);
        this.statusCode = statusCode;
        this.code = code;
        this.level = level;
        this.data = data;
    }
  }

export enum ErrorLevel {
    Fatal = "fatal",
    Error = "error",
    Warning = "warning",
    Info = "info",
    Debug = "debug",
}
