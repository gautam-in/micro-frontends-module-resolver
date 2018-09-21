import React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { SubspaceProvider } from "react-redux-subspace";

export default async (req, moduleName) => {
  return renderToString(
    <Provider store={req.store}>
      <SubspaceProvider
        mapState={state => ({ ...state[moduleName], rootState: state } || {})}
        namespace={moduleName}
      >
        {React.createElement(req.moduleObj.default)}
      </SubspaceProvider>
    </Provider>
  );
};
