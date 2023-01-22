import { makeHoursAvailableController } from './../factories/make-hours-available-controller';
import { makeScheduleController } from './../factories/make-create-schedule-controller';
import { adaptRoute } from './../adapters/express-route-adapter';
import { Router } from "express";


const scheduleRoutes = Router()

scheduleRoutes.post('/hours-available' , adaptRoute( makeHoursAvailableController() ) );
scheduleRoutes.post('/create' , adaptRoute( makeScheduleController() ) )


export {scheduleRoutes}