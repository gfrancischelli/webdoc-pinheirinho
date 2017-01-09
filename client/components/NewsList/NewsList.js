import React from 'react';
import {Link} from 'react-router';
import {imageURL, resourceURL} from 'utils';
import ImageSet from 'components/ImageSet/ImageSet';

const NewsList = ({ posts }) => (
  <ul className='list-ui'>
    { posts.map( post => (
      <li 
        key={post._id}
        className='o-list-ui__item'>
        <div className='flag flag--stack@mb'>
          <div className='flag__solid-cp'>
            { !post.heroImage ? null :
              <ImageSet
                url={imageURL('news', post.heroImage.filename)}
                className='c-thumb-large'
              />
            }
          </div>
          <div className='flag__fluid-cp u-pad-left-large'>
            <Link to={ resourceURL('noticias', post.slug) }>
              <h3 className='c-heading c-heading--small'>
                { post.title }
              </h3>
            </Link>
            <p>{ post.createdAt.slice(0, 10) }</p>
            <div dangerouslySetInnerHTML={{
              __html: post.content.slice(0, 360)
            }} />
          </div>
        </div>
      </li>
    ))}
  </ul>
);

NewsList.propTypes = {
  posts: React.PropTypes.array.isRequired
}

export default NewsList;
