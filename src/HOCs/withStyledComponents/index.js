import React, { Fragment, memo } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
import theme from "./theme";

function withMaterialUI(Component) {
  return memo(props => {
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
  });
}

export default withMaterialUI;
