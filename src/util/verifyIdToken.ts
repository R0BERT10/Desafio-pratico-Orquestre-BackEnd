import { GlobalServices } from "../app/services/GlobalServices"
import { Result } from "./ResultClassHandle"
import { ClientError } from "./ResultErrors"

export async function verifyIdToken(idToken: any): Promise<Result<boolean>> {
    if (typeof (idToken) != "string" || idToken == "") {
        return Result.fail(ClientError.UNAUTHORIZED(`function: verifyIdToken(${idToken})`, "Query 'idToken' is required",))
    }
    return await GlobalServices.verifyIdToken.execute(idToken)
}