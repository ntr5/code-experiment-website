import React, { useState } from "react";
import { useForm } from "react-hook-form";

import api from "../helpers/api";

// Items we need for axios call
// subject: req.body.subject,
// text: `
//   from: ${req.body.name}
//   contact: ${req.body.email}
//   message: ${req.body.text}

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, errors } = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(name, email, question);
    api
      .post("/", {
        subject: "New Message From Website",
        name: name,
        email: email,
        text: question,
      })
      .then((res) => {
        console.log(res);
        setName("");
        setEmail("");
        setQuestion("");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className='contact-form-wrapper' id='Contact'>
      <h1 className='contact-form-header-text'>Contact Us</h1>
      <form onSubmit={handleSubmit} className='contact-form'>
        <input
          name='name'
          placeholder='name'
          type='text'
          onChange={(event) => setName(event.target.value)}
          value={name}
          className='contact-form--input'
          ref={register({ required: "Required" })}
        />
        {errors.name && errors.name.message}

        <input
          name='email'
          placeholder='email'
          type='email'
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          className='contact-form--input'
          ref={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        {errors.email && errors.email.message}

        <textarea
          name='question'
          placeholder='question'
          type='textarea'
          onChange={(event) => setQuestion(event.target.value)}
          value={question}
          className='contact-form--input'
          ref={register({ required: "Required" })}
        />
        {errors.question && errors.question.message}
        {isLoading ? (
          <button type='button' className='contact-form-btn'>
            Sending...
          </button>
        ) : (
          <button type='submit' className='contact-form-btn'>
            Submit
          </button>
        )}
      </form>
    </div>
  );
};
