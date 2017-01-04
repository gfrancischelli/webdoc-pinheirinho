import React from 'react';
import { render  } from 'react-dom';
import { Router, Route, Redirect, browserHistory  } from 'react-router';

import routes from './routes';

// Components
import App from './App';

render((
  <App 
    history={browserHistory}
    routes={routes} />
), document.getElementById('root'));
