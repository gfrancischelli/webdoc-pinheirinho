import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

const concatArray = (arr, el) => arr.concat(el);

import TimelineItem from './TimelineItem';

class Timeline extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts:  [],
      pagination:  {
        next: 2,
      },
    }
    this.store = this.props.store;
  }

  componentDidMount() {
    const {store, loadPage} = this;
    const self = this;

    this.data$ = store
    .dataStream('timeline')
    .subscribe({
      next: (pages) => self.appendPage(pages),
    });

    loadPage(1);
  }

  appendPage = ({posts, pagination}) => {
    const newPosts = this.state
      .posts
      .slice(0)
      .reduce(concatArray, [])
      .concat(posts)
  
    this.setState({
      posts: newPosts,
      pagination: pagination,
    });
  }

  // Delete obj to prevent memory leak
  componentWillUnmount() {
    this.store.close('timeline')
    this.data$ = null;
  }

  loadPage = (p) => this.store.request(p, 'timeline');

  loadNext = () => this.loadPage(this.state.pagination.next);

  renderDescription() {
    const s = {marginBottom: "0.8em"};
    return (
      <div style={{marginBottom: "1.6em"}}>
        <p style={s}>A linha do tempo de Pinheirinho, a luta continua é uma ferramenta construída especificamente para agregar o material documental de um dos maiores movimentos de ocupação urbana ocorridas no Estado de São Paulo desde a redemocratização brasileira, a Ocupação Pinheirinho (2004 - 2012).</p>
        <p style={s}>Através desta ferramenta que agrega vários tipos de mídias (textos, vídeos, fotografias, documentos em PDF), é possível resgatar a história do movimento de maneira inédita e não somente através da perspectiva dos grandes meios de comunicação.</p>
        <p style={s}>Este tipo de ferramenta serve para que a memória das lutas sirva para o futuro, tanto para a organização das famílias que ainda lutam em Pinheirinho dos Palmares (o nome do conjunto habitacional criado após a desocupação no ano de 2012) quanto para novos sonhos, como a ocupação de Vila Soma, Campinas (SP), cujos relatos dos moradores relembram o Pinheirinho como uma verdadeira faculdade.</p>
        <p style={s}>Esperamos assim, contribuir para difusão da documentação e da memória das classes trabalhadoras, bem como servir de base de referência para a organização das futuras lutas.</p>
      </div>
    )
  }

  render() {
    const {posts, pagination} = this.state;
    return (
      <div className='o-wrapper' >
        <div className='o-band'> 
          <h1 className='c-heading '>Linha do Tempo</h1>
          {this.renderDescription()}
          <div className='c-timeline'>
          { posts.map( post => (
              <TimelineItem
                key={post._id}
                post={post}
              />
          )) }
          </div>
          { !pagination.next && posts.length > 0 ? null :
            <button 
                className='c-btn'   
                onClick={this.loadNext}
                style={ {margin: '0 auto', marginTop: '32px'} }>
              Carregar mais
            </button>
          }
        </div>
      </div>
    );
  }
}

export default Timeline


