import React , {Fragment} from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { SubspaceProvider } from "react-redux-subspace";

import styled, { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components';

export default async (req, moduleName) => {
  const sheet = new ServerStyleSheet();
  const Text = styled.h4`
      font-size:1rem;
      color: ${props => props.theme.primaryColor};
    `;
    console.log(Text);
  const MyModule = req.moduleObj.default;
  const myTheme = {primaryColor: 'yellow'};
  const html =  renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <Provider store={req.store}>
        <SubspaceProvider
          mapState={state => ({ ...state[moduleName], rootState: state } || {})}
          namespace={moduleName}
        >
        <ThemeProvider theme={myTheme}>
          <Fragment>
            <Text />
            <MyModule styled={styled} />
          </Fragment>
          </ThemeProvider>
        </SubspaceProvider>
      </Provider>
    </StyleSheetManager>
  );  
  const styles = sheet.getStyleTags();
  return {html, styles: styles};
};
