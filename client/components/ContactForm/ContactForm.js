import React from 'react';

class ContactForm extends React.Component {
  render() {
    return (
      <form onSubmit={ post } classNameName="c-form" method="post">

        <div className="c-form__field">
            <input ref="name" name="FullName" className="c-form__input"
                type="text" placeholder=" " required>
            <span className="fa fa-check-circle c-form__status-icon"></span>
            <label className="c-form__label" for="FullName">nome</label>
        </div>

        <div className="c-form__field">
            <input ref="email" name="Email" className="c-form__input"
                type="email" placeholder=" " required>
            <span className="fa fa-check-circle c-form__status-icon"></span>
            <label className="c-form__label" for="Email">email</label>
        </div>
          
        <div className="c-form__field">
            <input ref="subject" name="Subject" className="c-form__input"
                type="text" placeholder=" " required>
            <span className="fa fa-check-circle c-form__status-icon"></span>
            <label className="c-form__label" for="Subject">assunto</label>
        </div>

        <div className="c-form__field">
            <textarea ref="content" name="Content" className="c-form__input"
                type="text" placeholder=" " required></textarea>
            <label className="c-form__label" for="Subject">mensagem</label>
        </div>

        <load-button message={ "Enviar" } state={ status }>
            <yield to="completed">Mensagem Enviada</yield>
        </load-button>
      </form>

      

  </contact-form> 
    )
  }
}
