export type ResultError = {
    httpCodeResponse: number
    messageResponse: string
    functionOriginError: string
}

export class ClientError implements ResultError {
    static readonly enums: string[] = ["NOT_FOUND", "CONFLICT", "UNAUTHORIZED", "BAD_REQUEST"]

    static readonly NOT_FOUND = (origin: string) => { return new ClientError("NOT_FOUND", 404, "Object not found.", origin) }
    static readonly CONFLICT = (conflictMessage: string, origin: string) => { return new ClientError("CONFLICT", 409, conflictMessage, origin) }
    static readonly UNAUTHORIZED = (origin: string, message: string = "Access denied") => { return new ClientError("UNAUTHORIZED", 401, message, origin) }
    static readonly BAD_REQUEST = (message: string = "Bad request", origin: string) => { return new ClientError("BAD_REQUEST", 400, message, origin) }

    static readonly generic = (message: string, origin: string) => { return new ClientError("genericError", 400, message, origin) }
    // private to disallow creating other instances of this type
    private constructor(
        private key: string,
        public httpCodeResponse: number,
        public messageResponse: string,
        public functionOriginError: string) {
    }

    toString() {
        return this.key;
    }
}

export class ServerError implements ResultError {
    static readonly enums: string[] = ["INTERNAL_ERROR"]

    static readonly INTERNAL_ERROR = (origin: string) => { return new ServerError("INTERNAL_ERROR", 500, "Internal Server Error", origin) }

    static readonly generic = (message: string, origin: string) => { return new ServerError("genericError", 500, message, origin) }
    // private to disallow creating other instances of this type
    private constructor(
        private key: string,
        public httpCodeResponse: number,
        public messageResponse: string,
        public functionOriginError: string) {
        console.error(this.messageResponse, this.functionOriginError)
    }

    toString() {
        return this.key;
    }
}