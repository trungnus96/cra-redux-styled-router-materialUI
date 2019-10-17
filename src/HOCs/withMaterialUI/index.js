import React, { memo } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

function withMaterialUI(Component) {
  return memo(props => {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        <Component {...props} />
      </MuiThemeProvider>
    );
  });
}

export default withMaterialUI;
