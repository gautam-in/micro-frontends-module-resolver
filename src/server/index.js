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

  const moduleObj = requireFromString(moduleSource);
  const configureStore = requireFromString(configureStoreSource).default;

  req.store = configureStore();
  req.store.attachReducers({ [moduleName]: moduleObj.rootReducer });

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
