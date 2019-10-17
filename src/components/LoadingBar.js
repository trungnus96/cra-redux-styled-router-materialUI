import React, { memo, useEffect } from "react";
import styled from "styled-components";

import NProgress from "../config/NProgress";

const StyledLoadingBar = styled.div`
  padding: 20px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;

  > div {
    font-size: 14px;
  }
`;

function LoadingBar(props) {
  const { is_show_loading_text } = props;

  useEffect(() => {
    NProgress.start();

    return function cleanup() {
      NProgress.done(true);
    };
  }, []);

  if (is_show_loading_text === false) {
    return null;
  }

  return (
    <StyledLoadingBar>
      <div>LOADING...</div>
    </StyledLoadingBar>
  );
}

export default memo(LoadingBar);
