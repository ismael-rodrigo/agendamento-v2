import { addHours, addMinutes, addSeconds, isWithinInterval } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { ptBR } from "date-fns/locale";
import { Uuid } from "../../../../../shared/entities/uuid";
import { Either, Left, Right } from "../../../../../shared/errors-handler/either";
import { InvalidParamsError } from "../../../../../shared/errors-handler/errors/invalid-params-error";
import { CreateScheduleData, ScheduleData } from "./schedule-data";

export class Schedule {
    public readonly id:Uuid
    public readonly user_id: string
    public readonly service_id: string
    public readonly hour_id: string
    public readonly date: Date


    private constructor( id:Uuid, date:Date , hour_id:string , service_id:string , user_id:string ){
      this.id = id
      this.user_id = user_id
      this.service_id = service_id
      this.hour_id = hour_id
      this.date = date
    }

    static create({ id, date , hour , service , user_id , intervalAvailable }: CreateScheduleData ) :Either< InvalidParamsError , Schedule>  {
      if(!date) return Left.create(new InvalidParamsError("Date not provided"))
      if(!hour) return Left.create(new InvalidParamsError("Hour not provided"))
      if(!service) return Left.create(new InvalidParamsError("Service not provided"))
      if(!user_id) return Left.create(new InvalidParamsError("User not provided"))
      if(!intervalAvailable) return Left.create(new InvalidParamsError("Interval not provided"))


      const _id = id ? Uuid.create(id) : Uuid.create()

      if(hour.service_id != service.id){
        return Left.create(new InvalidParamsError("Hour does not belong to the service informed"))
      }
      if(intervalAvailable.service_id != service.id){
        return Left.create(new InvalidParamsError("Interval available does not belong to the service informed"))
      }
      
      if(!isWithinInterval( date , { start: intervalAvailable.intial_date , end:intervalAvailable.final_date }) || new Date(date) <= new Date()){
        return Left.create(new InvalidParamsError("Date not available"))
      }

      //const dateAdded = addMinutes(addHours(date,hour.hour),hour.minutes)
      return Right.create( new Schedule( _id , date , hour.id, service.id , user_id ))
    }

    get value(){
      return {
        id : this.id.value,
        user_id : this.user_id,
        service_id : this.service_id,
        hour_id : this.hour_id,
        date : this.date
      } as ScheduleData
    }

}