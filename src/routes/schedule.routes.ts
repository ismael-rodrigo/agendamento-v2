import { Router } from "express";
import { CreateScheduleController } from "../modules/schedule/controllers/create-schedule-controller";
import { FindHoursAvailableController } from "../modules/schedule/controllers/find-hours-available-controller";



const findHoursAvailableController = new FindHoursAvailableController()
const createScheduleController = new CreateScheduleController() 

const scheduleRoutes = Router()

scheduleRoutes.post('/hours-available' , findHoursAvailableController.handle );
scheduleRoutes.post('/create' , createScheduleController.handle )


export {scheduleRoutes}