import { makeFindDatesAvailableController } from './../factories/make-find-dates-available-controller';
import { makeFindServicesOfLocationController } from './../factories/make-find-services-of-location-controller';
import { makeFindLocationsController } from './../factories/make-find-locations-controller';
import { makeHoursAvailableController } from './../factories/make-hours-available-controller';
import { adaptRoute } from './../adapters/express-route-adapter';
import { Router } from "express";


const scheduleRoutes = Router()


scheduleRoutes.get('/locations' ,adaptRoute( makeFindLocationsController() ) )

scheduleRoutes.post('/services' ,adaptRoute( makeFindServicesOfLocationController() ) )
scheduleRoutes.post('/dates-available' ,adaptRoute( makeFindDatesAvailableController() ) )
scheduleRoutes.post('/hours-available' , adaptRoute( makeHoursAvailableController() ) );



export {scheduleRoutes}