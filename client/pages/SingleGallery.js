import React from 'react';
import {Link} from 'react-router';
import DangerousHTML from 'components/DangerousHTML/DangerousHTML';
import {imageURL, resourceURL} from 'utils';
import ImageSet from 'components/ImageSet/ImageSet';

class SingleGallery extends React.Component {
  constructor() {
    super()
    this.state = {
      post: {}
    }
  }
  componentDidMount() {
    this.loadPage(this.props.params.slug)
  }

  loadPage = (slug) => {
    const url = `/api/unique/galleries/${slug}`;
    const self = this;
    fetch( url )
      .then( res => res.json() )
      .then( post => self.setState({post: post}))
  }

  renderImages(images) {
    return (
      <div className='o-mosaic'>
       { !images ? null :
          images.map( (img, index) => (
          <li 
            key={index}
            className='o-mosaic__item'>
            <ImageSet
              src={img.url}
              alt={img.displayname}
              data-action='zoom'
              className='c-thumb-large'
            />
          </li>
        ))} 
      </div>
    )
  }

  render() {
    const {post} = this.state;
    return (
      <div className='o-wrapper o-wrapper--slim@ds'>
        <h1 className='c-heading c-heading--large@ds'>
          {post.title}
        </h1>
        { this.renderImages(post.images) } 
        <DangerousHTML content={post.content} />
      </div>
    )
  }
}

export default SingleGallery;
