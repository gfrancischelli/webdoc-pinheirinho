import React from 'react';

export default (props) => (
  <div
    {...props}
    className={`s-html-embed ${props.className}`}
    dangerouslySetInnerHTML={{__html: props.content}}
  />
)
