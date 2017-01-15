import React from 'react';

export default ({content}) => (
  <div
    className='s-html-embed'
    dangerouslySetInnerHTML={{__html: content}}
  />
)
