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

  render() {
    const {posts, pagination} = this.state;
    return (
      <div className='o-wrapper' >
        <div className='o-band'> 
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


