import React, { memo } from "react";

// components
import ErrorBoundary from "./ErrorBoundary";

function withErrorBoundary(Component) {
  return memo(props => {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  });
}

export default withErrorBoundary;