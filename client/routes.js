import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';

// Pages
import Home from './pages/Home'; 
import News from 'pages/News';

// Components
import Header from '#components/Header';
import Timeline from '#components/Timeline';

// Containers
import Page from 'containers/Page';

const routes = () => (
  <Route path='/' component={ Page }>
    <Route path='/timeline' component={ Timeline } />
    <Route path='/noticias' component={ News } />
    <Redirect from='*' to='/' />
    <IndexRoute component={ Home } />
  </Route>
)

export default routes;

