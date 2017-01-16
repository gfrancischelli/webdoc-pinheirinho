import React from 'react';
import {Link} from 'react-router';
import DangerousHTML from 'components/DangerousHTML/DangerousHTML';

class SinglePost extends React.Component {
  constructor() {
    super()
    this.state = {
      post: {}
    }
  }
  componentDidMount() {
    console.log('he')
    this.loadPage(this.props.params.slug)
  }

  loadPage = (slug) => {
    const url = `/api/unique/news/${slug}`;
    const self = this;
    fetch( url )
      .then( res => res.json() )
      .then( post => self.setState({post: post}))
  }

  render() {
    const {post} = this.state;
    console.log(post)
    return (
      <div className='o-wrapper o-wrapper--slim@ds'>
        <h1 className='c-heading c-heading--large@ds'>
          {post.title}
        </h1>
        <DangerousHTML content={post.content} />
      </div>
    )
  }
}

export default SinglePost;
