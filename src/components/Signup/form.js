import React from 'react';
import { Formik } from 'formik';
import DropZone from 'react-dropzone';
import classnames from 'classnames';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {
        profile_image: []
      },
      imagePreviewUrl: '',
    }
  }

  onDrop(acceptedFiles) {
    acceptedFiles.forEach(file => {
      console.log(acceptedFiles[0])
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsBinaryString = reader.result;
        this.setState({
          userData: {
            ...this.state.userData,
            profile_image: acceptedFiles[0]
          },
          imagePreviewUrl: fileAsBinaryString,
        })
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.readAsDataURL(file);
    });
  }

  render() {
    return (
      <div>
        <div>
          {/* Draopzone */}
          <img
            src={this.state.imagePreviewUrl}
            alt={this.state.imagePreviewUrl}
          />
          <DropZone
            onDrop={this.onDrop.bind(this)}
          >
            {
              ({
                getInputProps,
                getRootProps,
                isDragActive
              }) => {
                return (
                  <div
                    {...getRootProps()}
                    className={
                      classnames(
                        'dropzone',
                        { 'dropzone--isActive': isDragActive }
                      )
                    }
                  >
                    <input {...getInputProps()} />
                    {
                      isDragActive
                        ? <p>Arrastra tus archivos Aqui</p>
                        : <p>Intenta arrastras archivos aqui</p>
                    }
                  </div>
                );
              }
            }
          </DropZone>
        </div>
        <div>
          {/* Formulario */}
          <Formik
            initialValues={{
              first_name: '',
              last_name: '',
              email: '',
              password: '',
            }}
            validate={
              values => {
                let errors = {};
                if (!values.email) {
                  errors.email = "Email requerido";
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = "Email Invalido";
                }
                return errors;
              }
            }
            onSubmit={
              (values, { setSubmitting }) => {
                this.setState({
                  userData: {
                    ...values,
                    ...this.state.userData
                  }
                })
                this.props.handleSignUp(this.state.userData);
                setSubmitting(false);
              }
            }
          >
            {
              ({
                values,
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                  <form onSubmit={handleSubmit}>
                    FirstName:
                  <input
                      type="text"
                      id="inputFirstName"
                      name="first_name"
                      value={values["first_name"]}
                      onChange={handleChange}
                    />
                    <br />
                    LastName:
                  <input
                      type="text"
                      id="inputLastName"
                      name="last_name"
                      value={values["last_name"]}
                      onChange={handleChange}
                    />
                    <br />
                    email:
                  <input
                      type="email"
                      id="inputEmail"
                      name="email"
                      value={values["email"]}
                      onChange={handleChange}
                    />
                    {errors.email}
                    <br />
                    Password:
                  <input
                      type="text"
                      id="inputPassword"
                      name="password"
                      value={values["password"]}
                      onChange={handleChange}
                    />
                    <br />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                    >
                      registro
                    </button>
                  </form>
                )
            }
          </Formik>
        </div>
      </div >
    );
  }
}

export default Form;
