import React from 'react';


class StatusButton extends React.Component {

  renderStatus = (status) => {
    switch (status) {
      case 'success':
        return (
          <span>
            Enviado <span className='fa fa-check' />
          </span>
        )
      case 'pending':
        return (
          <span className='fa fa-spinner fa-pulse' />
        )
      case 'error':
        return (
          <span>
            Erro ao enviar <span className='fa fa-exclamation' />
          </span>
        )
      case 'invalid':
        return(
          <span>Enviar (formulário inválido)</span>
        )
      default:
        return (
          <span>Enviar</span>
        )
    }
  }

  render() {
    const status = this.props.status
    const btn_class = status === 'success' ? 'success' : ''; 
    return (
      <button
        className={`c-btn c-btn--fluid ${btn_class}`}
        onClick={this.props.handleClick}>
        { this.renderStatus(status) }
      </button>
    )
  }
}

StatusButton.PropTypes = {
  className: React.PropTypes.string,
  handleClick: React.PropTypes.func.isRequired,
}

export default StatusButton;
