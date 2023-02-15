import "express-async-errors"
import express from "express";
import cors from 'cors';

import { routes } from "./routes/_index";
import { errorHandler } from "./middlewares/error-middleware-handler";

const app = express()


app.use(cors({
    allowedHeaders:'*'
}))
app.use(express.json())
app.use(routes)
app.use(errorHandler.handle)


app.listen(3333 , () => console.log("Server is running") )




export {app }