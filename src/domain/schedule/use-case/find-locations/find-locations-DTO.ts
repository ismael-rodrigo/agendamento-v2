import { LocationData } from '@domain/_entities/location/location-data';
import { AppError } from '@shared/errors-handler/errors/app-error';
import { Either } from "@shared/errors-handler/either";

export type FindLocationsResponse = Either< AppError , LocationData[] >