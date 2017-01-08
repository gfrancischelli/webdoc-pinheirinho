import React from 'react';
import { Link } from 'react-router';
import ImageSet from 'components/ImageSet/ImageSet';

function FeaturedList({ featured }) {
  return (
    <ul className='o-feat-list'>
      { featured.map( (item, index) => (
        <li key={ index } className='o-feat-list__item o-card'>
          { !item.heroImage ? null :
            <ImageSet url={ item.heroUrl }>
              <img className='o-card__figure' /> 
            </ImageSet>
          }
          <div className='o-card__body'>
            <Link to='/noticias'>
              <h3 className='c-heading c-heading--small'>
                { item['título'] }
              </h3>
            </Link>
            { !item.content ? null :
              <p
                dangerouslySetInnerHTML={{__html:item.content.slice(0, 220)}}
                className='summary' />
            }
          </div>
        </li>
      ))}
    </ul>
  )  
}

FeaturedList.propTypes = {
  featured: React.PropTypes.array
}

export default FeaturedList;
