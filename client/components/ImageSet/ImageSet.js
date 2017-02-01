import React from 'react';
import breakpoints from 'media-query.js';
import  { zoom }  from 'lib/zoom/zoom';

class ImageSet extends React.Component {
  componentDidMount() {
    if ( this.props['data-action'] == 'zoom' ) {
      zoom.setup(this.img);
    }
  }

  render() {
    const { src, className } = this.props;
    return (
      <picture>
        <source
          media={`(max-width: ${breakpoints.phone})`}
          srcSet={ `${ src }?width=${ 370 }` } />
        <source
          media={`(max-width: ${breakpoints.tablet})`}
          srcSet={ `${ src }?width=${ 400 }` } />
        <source
          media={`(max-width: ${breakpoints.desktop})`}
          srcSet={ `${ src }?width=${ 620 }` } />
        <img
          {...this.props}
          ref={ c => this.img = c } />
      </picture>
    )
  }
}

export default ImageSet;
