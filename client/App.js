import React from 'react';
import { Component, PropTypes } from 'react';
import { Router } from 'react-router';

function hashLinkScroll() {
  const { hash } = window.location;
  if (hash !== '') {
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 0);
  }
}

class App extends React.Component {
  render() {
    const routes = this.props.routes();
    return (
        <Router
          routes={routes}
          history={this.props.history}
          onUpdate={hashLinkScroll} />
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.func.isRequired
}

export default App
