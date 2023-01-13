import { AppError } from "../../errors-handler/app-error";
import { Either, Left, Right } from "../../errors-handler/either";
import { InvalidParamsError } from "../../errors-handler/errors/invalid-params-error";
import { Uuid } from "../../utils/uuid-generator/uuid";
import { CreateScheduleData } from "./schedule-data";

export class Schedule {
    public readonly id:Uuid
    public readonly user_id :string
    public readonly service_id :string
    public readonly hour_id :string
    public readonly date :Date

    private constructor({ date , hour_id , service_id , user_id }: CreateScheduleData){
        this.id = Uuid.create()
        this.user_id = user_id
        this.service_id = service_id
        this.hour_id = hour_id
        this.date = date
    }

    static create({ date , hour_id , service_id , user_id }: CreateScheduleData):Either<InvalidParamsError , Schedule>  {
        if(!hour_id) return Left.create(new InvalidParamsError("Hour id invalid"))
        if(!service_id) return Left.create(new InvalidParamsError("Service id invalid"))
        if(!user_id) return Left.create(new InvalidParamsError("User id invalid"))
        if(date < new Date) return Left.create(new InvalidParamsError("Date invalid"))

        return Right.create(new Schedule({ date , hour_id , service_id , user_id }))
    }

    valueObject(){
        return {
          id : this.id.value,
          user_id : this.user_id,
          service_id : this.service_id,
          hour_id : this.hour_id,
          date : this.date
        }
      }

}