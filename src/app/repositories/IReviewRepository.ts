import { FindOptionsWhere } from "../../util/@Type.FindOptionsWhere"
import { Result } from "../../util/ResultClassHandle"
import Review, { IReviewEssential } from "../entities/Review"

export default interface IReviewRepository {
    createNewReview(user : Review) : Promise<Result<Review>>
    
    findByReviewAttributes(ReviewAttributes : FindOptionsWhere<Review>) : Promise<Result<Review>>

    updateUser(id : string, ReviewEssential : IReviewEssential) : Promise<Result<Review>>
    
    delete(uid : string) : Promise<Result<boolean>>
}