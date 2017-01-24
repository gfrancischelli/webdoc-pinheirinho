import React from 'react';
import { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import {imageURL, resourceURL} from 'utils';
import ImageSet from 'components/ImageSet/ImageSet';
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

  formatDate(date) {
    if (date.getHours() == 0) {
      return date.toLocaleDateString('pt-BR');
    } else {
      return date.toLocaleString('pt-BR').slice(0, -3);
    }
  }

  renderDownload = (pdf) => (
    <div className='c-download-link'>
      <span 
        style={{marginRight: '10px'}}
        className='fa fa-file-pdf-o' />
      <a 
        href={`/api/pdf/${pdf.filename}`}
        download={pdf.originalname}> 
        {pdf.originalname} 
      </a>
    </div>
  )

  render() {
    const title = this.props.post.title;
    const {open} = this.state;
    const { 
      content,
      data,
      pdf,
      pdfAtPreview,
      image,
      cover,
      video,
      videoAtPreview
    } = this.props.post;

    const date = data ? new Date(data) : false;
    const youtubeIdRX = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    return (
      <div
        className={`c-timeline-item${ open ? ' is-active' : '' }` }
        onClick={ this.handleClick }>
        { !date ? null :
          <div className='c-timeline-item__date'>
            {`${ this.formatDate(date) }` }
          </div>
        }
        { !videoAtPreview ? null :
            <iframe 
              style={{maxWidth: "100%"}}
              frameBorder="0"
              allowFullScreen
              src={ `https://www.youtube.com/embed/${ video.match(youtubeIdRX)[2] }` } />
        }
        <h3 className='c-timeline-item__title'> { title }</h3>
        { !pdf || !pdfAtPreview ? null : this.renderDownload(pdf) }
        { !cover ? null :
          <ImageSet
            alt={cover.originalname}
            url={imageURL('posts', cover.filename)}
            className='c-thumb-large'
          />
        }
        <div className='c-timeline-item__content'>
          { !pdf || pdfAtPreview ? null :
            <div className='c-download-link'>
              <span 
                style={{marginRight: '12px'}}
                className='fa fa-file-pdf-o' />
              <a 
                href={`/api/pdf/${pdf.filename}`}
                download={pdf.originalname}>
                {pdf.originalname} 
              </a>
            </div>
          }
          { !video || videoAtPreview ? null :
            <iframe 
              style={{maxWidth: '100%'}}
              frameBorder="0"
              allowFullScreen
              src={ `https://www.youtube.com/embed/${ video.match(youtubeIdRX)[2] }` } />
          }
          { !image || image.filename == 'null' ? null :
            <div className='c-download-link'>
                <label>Baixar imagem: </label> 
                <a 
                  href={`/api/images/${image.filename}`}
                  download={image.originalname}>
                  {image.originalname} 
                </a>
              </div>}
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
