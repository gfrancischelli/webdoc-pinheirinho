import React from 'react';
import ImageSet from '#components/ImageSet';

export default ({ featured }) => (
  <ul className='o-feat-list'>
    { featured.length === 0 ? null :
      featured.map( (item, index) => (
      <li key={ index } className='o-feat-list__item o-card'>
        { !item.heroUrl ? null :
          <ImageSet url={ item.heroUrl }>
             <img className='o-card__figure' /> 
          </ImageSet>
        }
        <div className='o-card__body'>
          <a href={ item.url }>
            <h3 className='c-heading c-heading--small'>
              { item.title }
            </h3>
          </a>
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
