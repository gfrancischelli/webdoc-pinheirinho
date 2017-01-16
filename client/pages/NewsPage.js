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
        next: 1,
      }
    }
    this.page = this.props.location.query.page - 1 || 0;
    this.store = this.props.store;
  }

  componentDidMount() {
    const {store, loadPage} = this;
    const self = this;

    this.data$ = store
    .dataStream('news')
    .subscribe({
      next: (pages) => self.setState(pages),
    });

    console.log('this.page', this.page)

    this.store.request(this.page, 'news');
  }

  componentWillUnmount() {
    // Delete obj to prevent memory leak
    this.data$ = null;
    this.store.close('news')
  }

  loadPage = (p) => this.store.request(p, 'timeline');

  loadNext = () => this.loadPage(this.state.next);

  render() {
    const {posts, pagination} = this.state;
    console.log(pagination.currentPage)
    const page = posts[pagination.currentPage - 1] || [];
    console.log(posts)
    return (
      <main className="o-band">
        <section className='o-wrapper o-wrapper--slim@ds'>
          <h2 className='c-heading c-heading--large'>
            Notícias
          </h2>
          <div className='o-layout'>
            <div className='o-layout__item'>
              { <NewsList posts={page} /> }
            </div>
          </div>
          { !pagination.pages ? null :
          <Pagination 
            pagination={pagination} />
          }
        </section>
      </main>
    )
  }
}

export default NewsPage;
