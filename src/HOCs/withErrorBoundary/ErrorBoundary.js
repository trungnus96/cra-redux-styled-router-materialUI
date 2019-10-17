import React from "react";
import styled from "styled-components";

const StyledErrorBoundary = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 500;

  .error-heading {
    font-size: 26px;
    font-weight: 500;
    color: ${props => props.theme.colors.red};
  }

  & > div {
    margin-bottom: 8px;
  }
`;

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <StyledErrorBoundary>
          <div className="error-heading">OOPS! Something went wrong.</div>
          <div>Refresh the page or try again later</div>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {process.env.NODE_ENV === "development" && this.state.errorInfo.componentStack}
          </details>
        </StyledErrorBoundary>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
