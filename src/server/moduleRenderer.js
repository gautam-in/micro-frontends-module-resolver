import React from "react";
import { renderToString } from "react-dom/server";

import Wrapper from "../shared/components/Wrapper";
import resolver from "./moduleResolver";

const urlPrefix =
  process.env.NODE_ENV === "production" ? "http://localhost:8001" : "";

const serverRenderer = () => (req, res) => {
  const state = JSON.stringify(req.store.getState());

  const moduleName = req.path.split("/")[1];

  return res.send({
    html: renderToString(
      <Wrapper state={state} id={moduleName}>
        {resolver(req)}
      </Wrapper>
    ),
    css: [
      urlPrefix + res.locals.assetPath("vendor.css"),
      urlPrefix + res.locals.assetPath(`${moduleName.toLowerCase()}.css`)
    ],
    js: [
      urlPrefix + res.locals.assetPath("vendor.js"),
      urlPrefix + res.locals.assetPath(`${moduleName.toLowerCase()}.js`)
    ]
  });
};

export default serverRenderer;
