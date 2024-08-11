export type ResultError = {
    httpCodeResponse : number
    messageResponse : string
    functionOriginError : string
}

export class ClientError implements ResultError {
    static readonly enums : string[] = ["NOT_FOUND", "CONFLICT"]
    
    static readonly NOT_FOUND = (origin:string) => {return new ClientError("NOT_FOUND", 404, "Object not found.", origin)}
    static readonly CONFLICT = (conflictMessage:string, origin:string) => {return new ClientError("CONFLICT", 409, conflictMessage, origin)}

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
    static readonly enums : string[] = ["INTERNAL_ERROR"]
    
    static readonly INTERNAL_ERROR = (origin:string) => {new ServerError("INTERNAL_ERROR", 500, "Internal Server Error", origin)}
    
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