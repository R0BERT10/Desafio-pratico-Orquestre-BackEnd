import { Request, Response } from "express";
import Genre, { IGenreEssential } from "../../entities/Genre";
import CreateGenreService from "../../services/GenreServices/CreateGenre";
import { Result } from "../../../util/ResultClassHandle";
import { ClientError } from "../../../util/ResultErrors";
import { verifyIdToken } from "../../../util/verifyIdToken";


interface BodyRequest extends IGenreEssential {
}
  
interface BodyResponse extends Genre {
}
  
export default class CreateGenreController {
constructor(
    private createService : CreateGenreService
) { }

handle = async (req: Request, res: Response) => {
    const { name } : BodyRequest = req.body
    const { idToken } = req.query
    let result : Result<Genre>
    const resultVerify = await verifyIdToken(idToken)
    if (resultVerify.isFailure){
        result = Result.fail(resultVerify.getError())
    } else if ( typeof(name) == 'string' ){
    result = await this.createService.execute({name});
    } else {
        result = Result.fail(ClientError.BAD_REQUEST("Incorrect request: must contain name", `CreateAccountController: handle`))
    }
    if (result.isFailure){
        const err = result.getError()
        return res.status(err.httpCodeResponse).json({code:err.httpCodeResponse, message:err.messageResponse})
    }
    const resBody : BodyResponse = result.getValue()
    return res.status(201).json(resBody);
    }

}