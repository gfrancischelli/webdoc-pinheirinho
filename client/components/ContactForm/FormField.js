import React from 'react';

export default ({name, type, required, label, onChange, children}) => (
  <div className="c-form__field">
    { children ? children && React.cloneElement(children, {
      name: name,
      className: 'c-form__input',
      type: type,
      placeholder: ' ',
      required: required || true,
    }) :
    <input
      name={name}
      onChange={onChange}
      className="c-form__input"
      type={type} placeholder=" " required={required || true} />
    }
    <span className="fa fa-check-circle c-form__status-icon" />
    <label className="c-form__label" htmlFor={name}>{label}</label>
  </div>
)
