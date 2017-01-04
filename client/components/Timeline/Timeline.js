import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';

import TimelineItem from './TimelineItem';

import load from './load-posts';

class Timeline extends Component {

  constructor() {
    super();
    this.state = {
      posts: { results: [], next: true }, 
    }
  }

  addPage = (res) => {
    const results = this.state.posts.results.concat(res.results);

    const posts = {
      results: results,
      next: res.next,
    }
    this.setState({posts: posts})
  }
  
  componentDidMount() {
    load(1).then(this.addPage)
  }

  loadNext = () => {
    const next = this.state.posts.next;
    load(next).then(this.addPage);
  }

  render() {
    const {query} = this.props.location;
    const posts = this.state.posts;
    return (
      <div
        className="o-wrapper" >
        { posts.results.length === 0 ? null : 
          posts.results.map( post => (
            <TimelineItem
              key={post._id}
              post={post}
            />
        )) }
        { !posts.next ? null :
          <button onClick={this.loadNext}>
            Carregar mais
          </button>
        }
      </div>
    );
  }
}

export default Timeline


