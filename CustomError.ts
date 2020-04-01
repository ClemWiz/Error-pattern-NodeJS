export default class ApiError extends Error {
    public statusCode: number;
    public message: string;
    public code: string;
    public level: string;
    public data?;

    constructor(statusCode: number, message: string, code: string, level: string, data?) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.level = level;
        this.data = data;
    }
  }