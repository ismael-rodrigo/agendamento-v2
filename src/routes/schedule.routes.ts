import { Router } from "express";
import { FindHoursAvailableController } from "../modules/schedule/controllers/find-hours-available-controller";



const findHoursAvailableController = new FindHoursAvailableController()


const scheduleRoutes = Router()

scheduleRoutes.post('/hours-available' , findHoursAvailableController.handle );



export {scheduleRoutes}