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
      next: 1,
    }
    this.store = this.props.store;
  }

  componentDidMount() {
    const {store, loadPage} = this;
    const self = this;

    this.data$ = store
    .dataStream('timeline')
    .subscribe({
      next: (pages) => self.setState(pages),
    });

    loadPage(0);
  }

  // Delete obj to prevent memory leak
  componentWillUnmount() {
    this.store.close('timeline')
    this.data$ = null;
  }

  loadPage = (p) => this.store.request(p, 'timeline');

  loadNext = () => this.loadPage(this.state.next);

  render() {
    const {posts, next} = this.state;
    return (
      <div className='o-wrapper' >
        <div className='o-band'> 
          { posts.reduce(concatArray, []).map( post => (
              <TimelineItem
                key={post._id}
                post={post}
              />
          )) }
          { !next && posts.length > 0 ? null :
            <button 
                className='c-btn'   
                onClick={this.loadNext}>
              Carregar mais
            </button>
          }
        </div>
      </div>
    );
  }
}

export default Timeline


