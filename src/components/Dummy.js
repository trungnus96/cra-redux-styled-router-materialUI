import React, { memo } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const StyledDummy = styled.div``;

function Dummy(props) {
  return <StyledDummy>StyledDummy</StyledDummy>;
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Dummy));
