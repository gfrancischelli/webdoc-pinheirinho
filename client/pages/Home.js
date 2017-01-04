import React from 'react';
import { Link } from 'react-router';
import Header from '../components/Header/Header';
import FeaturedList from '../components/FeaturedList/FeaturedList';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className='c-fluid-container-16-9'>
          <iframe 
            allowFullScreen
            src='https://www.youtube.com/embed/S5rezgxdPC0' />
        </div>
        <section className='o-band o-band--tint'>
          <div className='o-wrapper clearfix'>
            <h3 className='c-heading'>Notícias</h3>
            <FeaturedList featured={ data.news } />
            <h5>
              <a href='/noticias'
                className='c-link u-float-right'>
                 mais notícias
              </a>
            </h5>
          </div>
        </section>
        <section className='o-band o-band--tint'>
          <div className='o-wrapper clearfix'>
            <h3 className='c-heading'>Galerias</h3>
            <FeaturedList featured={ data.galleries } />
            <h5>
              <a href='/noticias'
                className='c-link u-float-right'> mais galerias
              </a>
            </h5>
            </div>
        </section>
      </div>
    )
  }
}

export default Home;

