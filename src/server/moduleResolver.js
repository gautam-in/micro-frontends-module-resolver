import React , {Fragment} from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { SubspaceProvider } from "react-redux-subspace";

import styled, { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default async (req, moduleName) => {
  const sheet = new ServerStyleSheet();
  const Text = styled.h4`
      font-size:1rem;
      color: red;
    `;
    console.log(Text);
    console.log(renderToString(<Provider store={req.store}>{React.createElement(req.moduleObj.default)}</Provider>));
  const html =  renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <Provider store={req.store}>
        <SubspaceProvider
          mapState={state => ({ ...state[moduleName], rootState: state } || {})}
          namespace={moduleName}
        >
          <Fragment>
            <Text />
            {React.createElement(req.moduleObj.default)}
          </Fragment>
        </SubspaceProvider>
      </Provider>
    </StyleSheetManager>
  ) + sheet.getStyleTags();
  //console.log(sheet.getStyleTags())
  return {html};
};
