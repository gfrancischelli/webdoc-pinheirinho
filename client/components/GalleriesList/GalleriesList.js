import React from 'react';
import {Link} from 'react-router';
import {imageURL, resourceURL} from 'utils';
import ImageSet from 'components/ImageSet/ImageSet';

const GalleriesList = ({ posts }) => (
  <ul className='o-mosaic'>
    { posts.map( post => (
      <li 
        key={post._id}
        className='o-mosaic__item o-mosaic__item--100@sm'>
        <div className='o-card'>
          <div className='o-card__figure'>
            { !post.cover ? null :
              <ImageSet
                url={imageURL('galleries', post.cover.filename)}
                className='c-thumb-jumbo'
              />
            }
          </div>
          <div className='o-card__body'>
            <Link to={ resourceURL('galerias', post.slug) }>
              <h5 className='o-card__title'>
                { post.title }
              </h5>
            </Link>
          </div>
        </div>
      </li>
    ))}
  </ul>
);

GalleriesList.propTypes = {
  posts: React.PropTypes.array.isRequired
}

export default GalleriesList;

