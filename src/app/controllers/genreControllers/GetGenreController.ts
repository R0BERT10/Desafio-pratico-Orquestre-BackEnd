import { Request, Response } from "express";
import GetGenreService from "../../services/GenreServices/GetGenre";
import Genre from "../../entities/Genre";
import { Result } from "../../../util/ResultClassHandle";
import { ClientError } from "../../../util/ResultErrors";
import { verifyIdToken } from "../../../util/verifyIdToken";

interface BodyResponse extends Genre {
}

export default class GetGenreController {
    constructor( private getGenre : GetGenreService ){
    }
    
    handle = async (req: Request, res: Response) => {
        const { idOrName } = req.params
        const { idToken } = req.query
        let result : Result<Genre>
        const resultVerify = await verifyIdToken(idToken)
        if (resultVerify.isFailure){
            result = Result.fail(resultVerify.getError())
        } else 
        if (!isNaN(+idOrName)){
            result = await this.getGenre.execute(+idOrName)
        } else if (typeof(idOrName) == "string") {
            result = await this.getGenre.execute(idOrName)
        } else {
            result = Result.fail(ClientError.BAD_REQUEST("name or id expected!", `GetGenreController: handle`))
        }
        if (result.isFailure){
            const err = result.getError()
            return res.status(err.httpCodeResponse).json({code:err.httpCodeResponse, message:err.messageResponse})
        }
        const resBody : BodyResponse = result.getValue()
        return res.status(200).json(resBody)
    }
}