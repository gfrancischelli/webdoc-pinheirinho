import React from 'react';
import {Link} from 'react-router';

export default ({pagination}) => {
  const {previous, next, pages, currentPage} = pagination;
  if (pages.length < 0) return null;

  const isActive = (page) => page === currentPage ? 'is-active' : '';
  console.log('next', currentPage)

  const url = (page) => `/noticias?page=${page}`;

  return (
    <ul className='c-pagination'>

      <li className='c-pagination__item'> 
        <Link
          to={url(previous)}
          className={`c-pagination__link is-${ previous ? 'enabled' : 'disabled' }`}>
          <span className='fa fa-chevron-left' />
        </Link>
      </li>
      { pages.map( page => (
        <li
          key={page}
          className='c-pagination__item'>
          <Link 
            to={ url(page) }
            className={`c-pagination__link ${ isActive(page) }` }>
            {page}
          </Link>
        </li>
      ))}
      <li className='c-pagination__item'> 
        <Link
          to={url(next)}
          className={`c-pagination__link is-${ next ? 'enabled' : 'disabled' }`}>
          <span className='fa fa-chevron-right' />
        </Link>
      </li>
    </ul>
  )
}
