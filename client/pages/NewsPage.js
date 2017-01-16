import React from 'react';

import {resourceURL, imageURL, concatArray} from 'utils';

import Pagination from 'components/Pagination/Pagination';
import NewsList from 'components/NewsList/NewsList';

class NewsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      pagination: {
        pages: [],
      }
    }
    this.store = this.props.store;
  }

  componentDidMount() {
    const currentPage = this.props.location.query.page || 1;
    const self = this;

    this.data$ = self.store
    .dataStream('news')
    .subscribe({
      next: (pages) => {
        if (pages.posts == undefined) {
          console.warn('posts is undefined')
          return
        } else {
          self.setState(pages)
        }
      } 
    });
    
    this.store.request(currentPage, 'news');
  }

  componentWillUnmount() {
    // Delete obj to prevent memory leak
    this.data$ = null;
    this.store.close('news')
  }

  componentWillReceiveProps(nextProps) {
    const page = nextProps.location.query.page;
    this.store.request(page, 'news');
  }

  render() {
    const {posts, pagination} = this.state;
    return (
      <main className="o-band">
        <section className='o-wrapper o-wrapper--slim@ds'>
          <h2 className='c-heading c-heading--large'>
            Notícias
          </h2>
          <div className='o-layout'>
            <div className='o-layout__item'>
              { posts == undefined ? null : <NewsList posts={posts} /> }
            </div>
          </div>
          { pagination.pages.length < 2 ? null :
          <Pagination 
            pagination={pagination} />
          }
        </section>
      </main>
    )
  }
}

export default NewsPage;
