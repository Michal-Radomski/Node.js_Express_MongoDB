import createError from "http-errors";
import cookieSession from "cookie-session";
import express, {RequestHandler, ErrorRequestHandler} from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";

import indexRouter from "./routes/index";
// import usersRouter from './routes/users';
import newsRouter from "./routes/news";
import quizRouter from "./routes/quiz";
import adminRouter from "./routes/admin";
import apiRouter from "./routes/api";

// let config = require("./config") //* stary system module.exports
import {config} from "./config";

mongoose.connect(config.db, {
  connectTimeoutMS: 10000,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("DB connection done");
});

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routerSetup();
    this.errorHandler();
  }

  private config() {
    // view engine setup
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, "public")));

    this.app.use(
      cookieSession({
        name: "session",
        keys: config.keySession,
        maxAge: config.maxAge,
      })
    );

    this.app.use(function (req, res, next) {
      console.log("req.path:", req.path);
      res.locals.path = req.path;
      next();
    });
  }

  private routerSetup() {
    this.app.use("/", indexRouter);
    // this.app.use('/users', usersRouter);
    this.app.use("/news", newsRouter);
    this.app.use("/quiz", quizRouter);
    this.app.use("/admin", adminRouter);
    this.app.use("/api", apiRouter);
  }

  private errorHandler() {
    // catch 404 and forward to error handler
    const requestHandler: RequestHandler = function (_req, _res, next) {
      next(createError(404));
    };
    this.app.use(requestHandler);

    // error handler
    const errorRequestHandler: ErrorRequestHandler = function (err, req, res, _next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    };
    this.app.use(errorRequestHandler);
  }
}

export default new App().app;
