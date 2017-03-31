import React from "react";
import FormField from "./FormField";
import StatusButton from "components/StatusButton/StatusButton";

const text_fields = [
  { name: "FullName", label: "nome" },
  { name: "Email", label: "email", type: "email" },
  { name: "Subject", label: "assunto" }
];

class ContactForm extends React.Component {
  constructor() {
    super();
    this.state = {
      FullName: "",
      Email: "",
      Subject: "",
      Content: "",
      Status: "initial",
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.form.checkValidity()) {
      this.setState({
        status: "invalid"
      });
      return;
    }

    this.setState({
      status: "pending"
    });

    const state = this.state;
    const body = JSON.stringify({
      name: state.FullName,
      address: state.Email,
      subject: state.Subject,
      content: state.Content
    });

    console.log(body);

    const component = this;
    fetch("/api/mail", {
      method: "post",
      body: body,
      headers: {
        Accept: "application/json, application/xml, text/plain, text/html, *.*",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .catch(err => {
        component.setState({
          status: "error"
        });
      })
      .then(data => {
        component.setState({
          status: "success"
        });
        component.form.reset();
      });
  };

  render() {
    const component = this;
    return (
      <form
        ref={c => component.form = c}
        className="c-form"
        onSubmit={this.post}
      >

        {text_fields.map((field, index) => (
          <FormField
            key={index}
            name={field.name}
            label={field.label}
            type={field.type || "text"}
            onChange={component.handleChange}
          />
        ))}

        <FormField name="Content" label="mensagem">
          <textarea onChange={component.handleChange} />
        </FormField>

        <StatusButton
          handleClick={this.handleSubmit}
          status={this.state.status}
        />

      </form>
    );
  }
}

export default ContactForm;
