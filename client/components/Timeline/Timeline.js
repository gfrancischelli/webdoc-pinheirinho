import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

import TimelineItem from './TimelineItem';

const concatArray = (arr, el) => arr.concat(el);

class Timeline extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts:  [],
      next: 1,
    }
    this.store = this.props.store;
    this.store.subscribe('update', this.updatePages)
  }

  componentDidMount() {
    this.store.request(1, 'timeline');
  }

  updatePages = (pages) => {
    this.setState({
      posts: pages.posts.reduce(concatArray, []),
      next: pages.next,
    });
  }

  loadNext = () => {
    this.store.request(this.state.next, 'timeline')
    //this.updatePages(this.state.next);
  }

  render() {
    const next = this.state.next;
    const posts = this.state.posts.slice(1);
    return (
      <div className='o-wrapper' >
        <div className='o-band'> 
          { posts.map( post => (
              <TimelineItem
                key={post._id}
                post={post}
              />
          )) }
          { !next ? null :
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


