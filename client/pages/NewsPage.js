import React from 'react';
import {Link} from 'react-router';

import {resourceURL, imageURL, concatArray} from 'utils';

import NewsList from 'components/NewsList/NewsList';

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
    this.store.getPage(page, 'news')
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

  render() {
    const next = this.state.next;
    const posts = this.state.posts.slice(1);
    console.log(posts)
    return (
      <main className="o-band">
        <section className='o-wrapper o-wrapper--slim@ds'>
          <h2 className='c-heading c-heading--large'>
            Notícias
          </h2>
          <div className='o-layout'>
            <div className='o-layout__item'>
              { <NewsList posts={posts} /> }
            </div>
          </div>
        </section>
      </main>
    )
    
  }
}


export default NewsPage;
