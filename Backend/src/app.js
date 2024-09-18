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
import reversegeocodingRouter from './routes/reversegeocoding.routers.js'
import userRouter from './routes/users.routers.js'

app.use("/cities" , citiesRouter)
app.use("/reversegeocoding" ,reversegeocodingRouter)
app.use("/user" , userRouter)

export {app}