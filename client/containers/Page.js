import React from 'react';
import Header from '#components/Header';

import Store from 'store';
const store = new Store(APP_DATA.posts);

export default props => (
  <div>
    <Header />
    { props.children && React.cloneElement(props.children, {
      store: store
    })}
  </div>
)
