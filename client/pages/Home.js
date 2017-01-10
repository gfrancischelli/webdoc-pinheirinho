import React from 'react';
import { Link } from 'react-router';

// Components
import Header from 'components/Header/Header';
import TimelineItem from 'components/Timeline/TimelineItem';
import FeaturedList from 'components/FeaturedList/FeaturedList';
import ContactForm from 'components/ContactForm/ContactForm';

class Home extends React.Component {
  render() {
    const { news, galleries } = APP_DATA;
    console.log('news: \n', news)
    return (
      <main id="main">
        <section className='o-wrapper'>
          <div className='c-fluid-container-16-9'>
            <iframe 
              allowFullScreen
              src='https://www.youtube.com/embed/S5rezgxdPC0' />
          </div>
        </section>
        { /* Preview Timeline */ }
        <section className='o-band o-band--tint'>
          <div className='o-wrapper clearfix'>
              <Link to='/timeline'>
                <h3 className='c-heading'>Linha do Tempo</h3>
              </Link>
              { APP_DATA.timeline.map( (post, index) => (
                <TimelineItem key={index} post={post} />
              ))}
          </div>
        </section>
        <section className='o-band o-band--tint'>
          <div className='o-wrapper clearfix'>
            <h3 className='c-heading'>Notícias</h3>
            <FeaturedList featured={ news } type='noticias' />
            <h5>
              <Link to='/noticias'
                className='c-link u-float-right'>
                mais notícias
              </Link>
            </h5>
          </div>
        </section>
        <section className='o-band o-band--red'>
          <div className='o-wrapper clearfix'>
            <h3 className='c-heading u-font-white'>Galerias</h3>
            <FeaturedList featured={ galleries } type='galerias' />
            <h5>
              <Link to='/noticias'
                className='c-link u-font-white u-float-right'> mais galerias
              </Link>
            </h5>
          </div>
        </section>
        <section id='fale-conosco' className='o-band'>
          <div className='o-wrapper o-wrapper--small@ds'>
            <h3 className='c-heading'>Fale Conosco</h3>
            <ContactForm />
          </div>
        </section>
      </main>
    )
  }
}

export default Home;

