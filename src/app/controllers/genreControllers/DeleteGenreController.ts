import { Request, Response } from "express";
import DeleteGenreService from "../../services/GenreServices/DeleteGenre";
import { Result } from "../../../util/ResultClassHandle";
import { ClientError } from "../../../util/ResultErrors";
import { verifyIdToken } from "../../../util/verifyIdToken";

export default class DeleteGenreController {
    constructor( private deleteService : DeleteGenreService ){
    }
    handle = async (req: Request, res: Response) => {
        const { id } = req.params
        const { idToken } = req.query
        let result : Result<boolean>
        const resultVerify = await verifyIdToken(idToken)
        if (resultVerify.isFailure){
            result = resultVerify
        } else if (!isNaN(+id)) {
            result = await this.deleteService.execute(+id)
        } else {
            result = Result.fail(ClientError.BAD_REQUEST("id is required", `DeleteGenreController: handle`))
        }
        if (result.isFailure){
            const err = result.getError()
            return res.status(err.httpCodeResponse).json({code:err.httpCodeResponse, message:err.messageResponse})
        }
        const isDeleteSuccess = result.getValue()
        if (isDeleteSuccess){
            return res.status(204).json()
        } else {
            return res.status(400).json({code:400, message:"No records were deleted."})
        }
    }
}