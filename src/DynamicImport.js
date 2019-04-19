import React, { PureComponent } from 'react'

class DynamicImport extends PureComponent {
  _isMounted = false;

  state = {
    component: null
  }

  componentDidMount () {
    this.props.load()
      .then((component) => {
        this._isMounted = true;
        if(this._isMounted){
          this.setState(() => ({
            component: component.default ? component.default : component
          }));
        }
      })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return this.props.children(this.state.component)
  }
}

const dynamicImport = (path) => (props) => {
  return (
    <DynamicImport load={() => import(`${path}`)}>
      {Component => Component === null
        ? <p>Loading</p>
        : <Component {...props} />}
    </DynamicImport>
  );
}

export default dynamicImport;