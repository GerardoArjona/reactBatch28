import React from "react";
import { Formik, Field } from "formik";

class FormPost extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>Postea algo</h2>
        <Formik
          initialValues={{
            title: "",
            content: "",
            category: ""
          }}
          validate={values => {
            let errors = {};
            if (!values.title) {
              errors.title = "Titulo Requerido";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.props.handleCreatePopst(values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={values.title}
              />
              {errors.title}
              <input
                type="text"
                name="content"
                onChange={handleChange}
                value={values.content}
              />
              <Field component="select" name="category">
                <option value="">NO CATEGORY</option>
                <option value="TECH">TECH</option>
                <option value="GAME">GAME</option>
              </Field>
              <button type="onSubmit">Register porst</button>
            </form>
          )}
        </Formik>
      </React.Fragment>
    );
  }
}

export default FormPost;
