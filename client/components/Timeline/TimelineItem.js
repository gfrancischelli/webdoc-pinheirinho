import React from 'react';
import { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import DangerousHTML from 'components/DangerousHTML/DangerousHTML';

class TimelineItem extends Component {
  handleClick() {
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
    const {open} = this.state;
    const { content, data, pdf } = this.props.post;
    const date = data? new Date(data) : false;
    return (
      <div
        className={`c-timeline-item${ open ? ' is-active' : '' }` }
        onClick={ this.handleClick }>
        { !date ? null :
          <div className='c-timeline-item__date'>
            {`${date.getMonth().toLocaleString('pt-BR')}/${date.getFullYear()}` }
          </div>
        }
        <h3 className='c-timeline-item__title'> { title }</h3>

        <div className='c-timeline-item__content'>
          { !pdf ? null :
            <div className='c-download-link'>
              <label>Download: </label> 
              <a 
                href={pdf.filename}
                style={{zIndex: 10}}
                download={pdf.originalname}>
                {pdf.originalname} 
              </a>
            </div>
          }
          <DangerousHTML content={content} />
        </div>
      </div>
    )
  }
}

TimelineItem.propTypes = {
  post: PropTypes.object.isRequired,
}

export default TimelineItem
