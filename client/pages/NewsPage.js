import React from 'react';
import {Link} from 'react-router';

import {resourceURL, imageURL, concatArray} from 'utils';

class NewsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      next: 1
    }
    this.store = this.props.store;
  }

  componentDidMount() {
    this.updatePages(1);
  }

  updatePages = (page) => {
    const self = this;
    this.store.getPage(page)
      .then( pages => {
        return {
          posts: pages.posts.reduce(concatArray, []),
          next: pages.next,
        }
      })
      .then( result => self.setState({
        posts: result.posts,
        next: result.next
      }));
  }

  loadNext = () => {
    this.updatePages(this.state.next);
  }

  renderList(posts) {
    console.log('posts: \n', posts)
    return (
      <ul className='list-ui'>
        { posts.map( post => (
          <li 
            key={post._id}
            className='o-list-ui__item'>
            <div className='flag flag--stack@mb'>
              <div className='flag__solid-cp'>
                <img className='c-thumb-large'
                  src={``} />
              </div>
              <div className='flag__fluid-cp u-pad-left-large'>
                <Link to={ resourceURL('noticias', post.slug) }>
                  <h3 className='c-heading c-heading--small'>
                    { post['título'] }
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
    )
  }

  render() {
    const next = this.state.next;
    const posts = this.state.posts.slice(1);
    return (
      <main className="o-band">
        <section className='o-wrapper o-wrapper--slim@ds'>
          <h2 className='c-heading c-heading--large'>
            Notícias
          </h2>
          <div className='o-layout'>
            <div className='o-layout__item'>
              { this.renderList(posts) }
            </div>
          </div>
        </section>
      </main>
    )
    
  }
}


export default NewsPage;
