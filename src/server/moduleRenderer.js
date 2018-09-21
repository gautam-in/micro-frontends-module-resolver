import React from "react";
import { renderToString } from "react-dom/server";

import Wrapper from "./components/Wrapper";
import resolver from "./moduleResolver";

const urlPrefix = "/shared";

const serverRenderer = () => async (req, res) => {
  const state = JSON.stringify(req.store.getState());

  const moduleName = req.path.split("/")[1];
  const moduleNameLowerCase = moduleName.toLowerCase();

  const css = [];
  if (req.moduleManifest[moduleNameLowerCase + ".vendor.css"]) {
    css.push(
      urlPrefix + "/" + req.moduleManifest[moduleNameLowerCase + ".vendor.css"]
    );
  }

  if (req.moduleManifest[moduleNameLowerCase + ".css"]) {
    css.push(
      urlPrefix + "/" + req.moduleManifest[moduleNameLowerCase + ".css"]
    );
  }

  const js = [];
  if (req.moduleManifest[moduleNameLowerCase + ".vendor.js"]) {
    js.push(
      urlPrefix + "/" + req.moduleManifest[moduleNameLowerCase + ".vendor.js"]
    );
  }

  if (req.moduleManifest[moduleNameLowerCase + ".js"]) {
    js.push(urlPrefix + "/" + req.moduleManifest[moduleNameLowerCase + ".js"]);
  }

  return res.send({
    html: renderToString(
      <Wrapper state={state} id={moduleName} clientOnly={req.body.clientOnly}>
        {await resolver(req, moduleName)}
      </Wrapper>
    ),
    css,
    js
  });
};

export default serverRenderer;
