import { Request, Response } from "express";
import Genre, { IGenreEssential } from "../../entities/Genre";
import UpdateGenreService from "../../services/GenreServices/updateGenre";
import { Result } from "../../../util/ResultClassHandle";
import { ClientError } from "../../../util/ResultErrors";
import { verifyIdToken } from "../../../util/verifyIdToken";

interface BodyRequest extends IGenreEssential {
}

interface BodyResponse extends Genre {
}

export default class UpdateGenreController {
    constructor(private updateService: UpdateGenreService) {
    }
    handle = async (req: Request, res: Response) => {
        const { id } = req.params
        const { name } = req.body as BodyRequest
        const { idToken } = req.query
        let result: Result<Genre>
        const resultVerify = await verifyIdToken(idToken)
        if (resultVerify.isFailure) {
            result = Result.fail(resultVerify.getError())
        } else if (!isNaN(+id)) {
            result = await this.updateService.execute(+id, { name })
        } else {
            result = Result.fail(ClientError.BAD_REQUEST("id is required", `UpdateGenreController: handle`))
        }

        if (result.isFailure) {
            const err = result.getError()
            return res.status(err.httpCodeResponse).json({ code: err.httpCodeResponse, message: err.messageResponse })
        }

        const resBody: BodyResponse = result.getValue()
        return res.status(200).json(resBody)
    }
}