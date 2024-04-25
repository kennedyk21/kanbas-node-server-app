import express from 'express';
import session from "express-session";
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from "./Kanbas/modules/routes.js";
import mongoose from "mongoose";
import cors from "cors";
import UserRoutes from "./Users/routes.js";
import "dotenv/config";


const app = express()
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);
 

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.HTTP_SERVER_DOMAIN,
    };
  }
  app.use(session(sessionOptions));
  

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
 );
  
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
Lab5(app);
Hello(app)
UserRoutes(app);
app.listen(process.env.PORT || 4000);

