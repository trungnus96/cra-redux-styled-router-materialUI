import React, { Fragment } from 'react';
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import theme from "./theme";

function withMaterialUI(Component) {
  return (props) => {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle />
          <Component {...props} />
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default withMaterialUI;