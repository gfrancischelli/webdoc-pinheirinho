import React from 'react';
import { Component, PropTypes } from 'react';
import { Router } from 'react-router';

class App extends React.Component {
  render() {
    const routes = this.props.routes();
    return (
        <Router
          routes={routes}
          history={this.props.history}/>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.func.isRequired
}

export default App
