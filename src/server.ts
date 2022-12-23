import "express-async-errors"
import express, { NextFunction, Request, response, Response } from "express";
import { routes } from "./routes";
import { AppError } from "./errors/appError";
import { errorHandler } from "./errors/errorHandler";


const app = express()

app.use(express.json())
app.use(routes)
app.use(errorHandler.handle)

app.listen(3333 , () => console.log("Server is running") )