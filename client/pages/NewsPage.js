import React from 'react';

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
    const {store, loadPage} = this;
    const self = this;

    this.data$ = store
    .dataStream('news')
    .subscribe({
      next: (pages) => self.setState(pages),
    });

    this.store.request(0, 'news');
  }

  componentWillUnmount() {
    // Delete obj to prevent memory leak
    this.data$ = null;
    this.store.close('news')
  }

  loadPage = (p) => this.store.request(p, 'timeline');

  loadNext = () => this.loadPage(this.state.next);

  render() {
    const {posts, next} = this.state;
    const page = posts[0] || [];
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
        </section>
      </main>
    )
  }
}

export default NewsPage;
