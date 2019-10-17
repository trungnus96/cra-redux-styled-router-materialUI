import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

export default class App extends Component {
  render() {
    return (
      <div>
        <h2>Hello world! 123</h2>
        <Button variant="contained" color="primary">
          Default
        </Button>
      </div>
    );
  }
}
