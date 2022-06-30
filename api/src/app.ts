import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {Application, NextFunction, Response, Request} from 'express';
import morgan from 'morgan';
import config from "../config"
import {router} from "./routes/index"
import {handleError, notFound} from './middlewares'

const app: Application = express();
app.use(express.urlencoded({extended: true, limit: '50mb'})); //middleware
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(
 cors({
  origin: config.cors,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'authorization'],
 }),
);

app.use('/api', router)

app.use(notFound)
app.use(handleError)

export default app;