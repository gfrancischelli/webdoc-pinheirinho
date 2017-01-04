import React from 'react';
import breakpoints from 'media-query.js';

export default ({ url, children }) => (
  <picture>
    <source
      media={`max-width: ${breakpoints.phone}`}
      srcSet={ `${ item.heroUrl }?width=${ 370 }` } />
    <source
      media={`max-width: ${breakpoints.tablet}`}
      srcSet={ `${ item.heroUrl }?width=${ 400 }` } />
    { children } 
  </picture>
)

