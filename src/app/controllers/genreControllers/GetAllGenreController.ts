import { Request, Response } from "express";
import Genre from "../../entities/Genre";
import { Result } from "../../../util/ResultClassHandle";
import { verifyIdToken } from "../../../util/verifyIdToken";
import GetAllGenreService from "../../services/GenreServices/GetAllGenre";

type BodyResponse = Genre[]

export default class GetAllGenreController {
    constructor(private getGenre: GetAllGenreService) {
    }

    handle = async (req: Request, res: Response) => {
        const { idOrName } = req.params
        const { idToken } = req.query
        let result: Result<Genre[]>
        const resultVerify = await verifyIdToken(idToken)
        if (resultVerify.isFailure) {
            result = Result.fail(resultVerify.getError())
        } else {
            result = await this.getGenre.execute()
        }
        if (result.isFailure) {
            const err = result.getError()
            return res.status(err.httpCodeResponse).json({ code: err.httpCodeResponse, message: err.messageResponse })
        }
        const resBody: BodyResponse = result.getValue()
        return res.status(200).json(resBody)
    }
}