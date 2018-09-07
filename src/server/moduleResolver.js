import React from "react";
import fs from "fs";
import requireFromString from "require-from-string";
import { StaticRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";

export default req => {
  const moduleName = req.path.split("/")[1];

  const Module = fs.readFileSync(`./build/shared/${moduleName}.js`).toString();

  return renderToString(
    <Provider store={req.store}>
      <Router location={req.url} context={{}}>
        {React.createElement(requireFromString(Module).default)}
      </Router>
    </Provider>
  );
};
