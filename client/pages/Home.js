import React from 'react';

import { Link } from 'react-router';

// Components
import Header from 'components/Header/Header';
import TimelineItem from 'components/Timeline/TimelineItem';
import FeaturedList from 'components/FeaturedList/FeaturedList';
import ContactForm from 'components/ContactForm/ContactForm';

class Home extends React.Component {
  renderTimelineDescription() {
    return (
      <div>
      <p>A linha do tempo apresentada em <b>Pinheirinho, a luta continua</b> é uma plataforma construída especificamente para agregar o material documental de um dos maiores movimentos de ocupação urbana ocorridas no Estado de São Paulo desde a redemocratização brasileira. Através de uma plataforma interativa que permite a comunicação através de vários tipos de mídias (textos, vídeos, fotografias, documentos em PDF), é possível resgatar a história do movimento de maneira inédita.
      </p>
      <p>Mas este tipo de ferramenta também serve para o futuro, tanto para a organização das famílias que ainda lutam em Pinheirinho dos Palmares (o nome do conjunto habitacional criado após a desocupação no ano de 2012) quanto para novos sonhos como a ocupação de Vila Soma, Campinas (SP), cujos relatos dos moradores relembram o Pinheirinho como uma verdadeira faculdade.
      </p>
      <p>Esperamos assim, contribuir para a documentação e memória das classes trabalhadoras, bem como servir de ferramenta para a organização das futuras lutas.
      </p>
    </div>
    )
  }
  render() {
    const { timeline, news, galleries } = APP_DATA;
    return (
      <main id="main">
        <section className='o-wrapper'>

        </section>
        { /* Preview Timeline */ }
        <section className='o-band o-band'>
          <div className='o-wrapper clearfix'>
              <div className='o-wrapper__featured'>
                <Link to='/timeline'>
                  <h3 className='c-heading c-heading--large@ds'>Linha do Tempo</h3>
                </Link>
                { this.renderTimelineDescription() }
              </div>
              <div className='c-timeline'>
              { timeline.map( (post, index) => (
                <TimelineItem key={index} post={post} />
              ))}
              </div>
              <Link to='/timeline'
                className='c-link u-float-right'>
                Veja a linha do tempo completa
              </Link>
          </div>
        </section>
        <section className='o-band o-band--tint'>
          <div className='o-wrapper clearfix'>
            <h3 className='c-heading'>Notícias</h3>
            <FeaturedList featured={ news } type='news' />
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
            <FeaturedList featured={ galleries } type='galleries' />
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

