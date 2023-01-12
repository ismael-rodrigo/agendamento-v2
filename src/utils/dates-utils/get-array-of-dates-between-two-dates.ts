import { AppError } from "../../errors-handler/app-error";
import { Either, Left, Right } from "../../errors-handler/either";

export const getDaysArray = function(start :Date, end: Date):Either<AppError , Date[]> {
    if(start>end) return Left.create(new AppError("Initial date is not before as final date", "DATES_PARAMS_INVALID"))
    for(var arr=[], dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return Right.create(arr);
};