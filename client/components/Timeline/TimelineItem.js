import React from 'react';
import { Component, PropTypes } from 'react';
import { render } from 'react-dom';

class TimelineItem extends Component {
  handleClick() {
    console.log('click')
    if (this.state.open == 0) {
      this.setState({open: 1});
    } else {
      this.setState({open: 0});
    }
  }

  constructor() {
    super();
    this.state = {open: 0};
    this.handleClick = this.handleClick.bind(this);
  }
  
  render() {
    const title = this.props.post.title;
    const { content, data } = this.props.post;
    const date = new Date(data);
    return (
      <div
        className='timeline-item'
        onClick={ this.handleClick }>
        <div>
          <h6>
            { `${date.getMonth().toLocaleString('pt-BR')}/${date.getFullYear()}` }
          </h6>
          <h5> { title }</h5>
        </div>

        { this.state.open == 0 ? null:
          <div className='timeline-item__content'
            dangerouslySetInnerHTML={{__html: content}}>
          </div>
        }
      </div>
    )
  }
}

TimelineItem.propTypes = {
  post: PropTypes.object.isRequired,
}

export default TimelineItem
