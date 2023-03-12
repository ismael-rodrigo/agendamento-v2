import { makeUnauthenticatedSchedulingController } from './../factories/make-unauthenticated-scheduling-controller';
import { makeFindDatesAvailableController } from './../factories/make-find-dates-available-controller';
import { makeFindServicesOfLocationController } from './../factories/make-find-services-of-location-controller';
import { makeFindLocationsController } from './../factories/make-find-locations-controller';
import { makeHoursAvailableController } from './../factories/make-hours-available-controller';
import { adaptRoute } from './../adapters/express-route-adapter';
import { Router } from "express";


const scheduleRoutes = Router()


scheduleRoutes.get('/locations' ,adaptRoute( makeFindLocationsController() ) )
scheduleRoutes.get('/services' , adaptRoute( makeFindServicesOfLocationController() ) )
scheduleRoutes.get('/dates-available' ,adaptRoute( makeFindDatesAvailableController() ) )
scheduleRoutes.get('/hours-available' , adaptRoute( makeHoursAvailableController() ) );

scheduleRoutes.post('/unauthenticated-schedule' , adaptRoute( makeUnauthenticatedSchedulingController() ) );

export {scheduleRoutes}