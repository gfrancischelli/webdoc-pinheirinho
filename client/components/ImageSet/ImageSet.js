import React from 'react';
import breakpoints from 'media-query.js';

export default ({ url, className }) => (
  <picture>
    <source
      media={`(max-width: ${breakpoints.phone})`}
      srcSet={ `${ url }?width=${ 370 }` } />
    <source
      media={`(max-width: ${breakpoints.tablet})`}
      srcSet={ `${ url }?width=${ 400 }` } />
    <source
      media={`(max-width: ${breakpoints.desktop})`}
      srcSet={ `${ url }?width=${ 620 }` } />
    <img 
      src={ url }
      className={className} /> 
  </picture>
)

