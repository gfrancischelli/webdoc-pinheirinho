import React from 'react';

export default (props) => (
  <div
    className={`s-html-embed ${props.className || ''}`}
    dangerouslySetInnerHTML={{__html: props.content}}
  />
)
