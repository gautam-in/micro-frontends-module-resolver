import React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";

export default async req => {
  return renderToString(
    <Provider store={req.store}>
      {React.createElement(req.moduleObj.default)}
    </Provider>
  );
};
