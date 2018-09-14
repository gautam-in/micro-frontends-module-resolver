// import React from 'react';
import express from "express";
import cors from "cors";
import path from "path";
import chalk from "chalk";
import bodyParser from "body-parser";
import serverRenderer from "./moduleRenderer";
import fetch from "./fetch";
import requireFromString from "require-from-string";

const urlPrefix = "http://localhost:8002/shared";
const API_SERVER = "http://localhost:8003";

const app = express();

app.use("/favicon.ico", (req, res) => {
  res.send("");
});

app.use(cors());

app.use(bodyParser.json());

app.use(async (req, res, next) => {
  const moduleName = req.path.split("/")[1];

  const moduleManifest = await fetch(
    urlPrefix + "/" + moduleName.toLowerCase() + ".manifest.json",
    undefined,
    true
  );

  const moduleSource = await fetch(
    urlPrefix + "/" + moduleManifest[moduleName.toLowerCase() + ".js"]
  );

  const configureStoreSource = await fetch(urlPrefix + "/configureStore.js");
  const globalReducerSource = await fetch(urlPrefix + "/globalReducer.js");

  const moduleObj = requireFromString(moduleSource);
  const configureStore = requireFromString(configureStoreSource).default;
  const globalReducer = requireFromString(globalReducerSource).default;

  // TODO: Gather initials task from API server
  // const globalActionTypes = requireFromString(globalReducerSource).ActionTypes;
  // const globalData = await fetch(API_SERVER + "/global", undefined, true);
  // console.log(globalData);

  req.store = configureStore();
  if (moduleObj.rootReducer)
    req.store.attachReducers({ [moduleName]: moduleObj.rootReducer });

  req.store.attachReducers({ globalData: globalReducer });

  // req.store.dispatch({
  //   type: globalActionTypes.INIT_GLOBAL_DATA,
  //   state: globalData
  // });

  req.moduleObj = moduleObj;
  req.moduleManifest = moduleManifest;

  return next();
});

app.use(serverRenderer());

app.listen(process.env.PORT || 8001, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(
      `App is running: 🌎 http://localhost:${process.env.PORT || 8001}`
    )
  );
});

export default app;

export const test = "FOO";
