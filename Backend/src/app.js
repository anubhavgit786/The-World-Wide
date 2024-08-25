import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())


//routes

import citiesRouter from './routes/cities.routes.js'

app.use("/cities" , citiesRouter)

export {app}