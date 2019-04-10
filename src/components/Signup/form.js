import React from 'react'
import { Formik } from 'formik';
import DropZone from 'react-dropzone';
import classNames from 'classnames';

class SignUpForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: {
                profile_image: [],
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
            <div className='container'>
                <div className='imageContainer'>
                    <img
                        src={this.state.imagePreviewUrl}
                        alt={this.state.imagePreviewUrl}
                    />
                    <DropZone
                        onDrop={this.onDrop.bind(this)}
                    >
                        {
                            ({
                                getRootProps,
                                getInputProps,
                                isDragActive
                            }) => {
                                return (
                                    <div
                                        {...getRootProps()}
                                        className={classNames(
                                            'dropzone',
                                            { 'dropzone--isActive': isDragActive }
                                        )}
                                    >
                                        <input
                                            {...getInputProps()}
                                        />
                                        {
                                            isDragActive
                                                ? <p>Arrastra archivos Aqui</p>
                                                : <p>intenta arrastrar archivos a esta zona</p>
                                        }
                                    </div>
                                )
                            }

                        }
                    </DropZone>
                </div>
                <div className='formContainer'>
                    <Formik
                        initialValues={{
                            first_name: '',
                            last_name: '',
                            email: '',
                            password: '',
                        }}
                        validate={values => {
                            let erros = {};
                            if (!values.email) {
                                erros.email = 'Email Requerido'
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                erros.email = 'Email Invalido'
                            }
                            return erros;
                        }}
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
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label
                                                htmlFor="inputFirstName"
                                                className="col-sm-2 col-form-label"
                                            >
                                                First Name
                                        </label>
                                            <div className="col-sm-10">
                                                <input
                                                    type='text'
                                                    id="inputFirstName"
                                                    name='first_name'
                                                    value={values['first_name']}
                                                    onChange={handleChange}
                                                    className="form-control form-control-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                htmlFor="inputLastName"
                                                className="col-sm-2 col-form-label"
                                            >
                                                Last Name
                                        </label>
                                            <div className="col-sm-10">
                                                <input
                                                    type='text'
                                                    id="inputLastName"
                                                    name='last_name'
                                                    value={values['last_name']}
                                                    onChange={handleChange}
                                                    className="form-control form-control-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                htmlFor="inputEmail"
                                                className="col-sm-2 col-form-label"
                                            >
                                                Email
                                        </label>
                                            <div className="col-sm-10">
                                                <input
                                                    type='text'
                                                    id="inputEmail"
                                                    name='email'
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    className="form-control form-control-sm"
                                                />
                                                {errors.email}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                htmlFor="inputPassword"
                                                className="col-sm-2 col-form-label"
                                            >
                                                Password
                                        </label>
                                            <div className="col-sm-10">
                                                <input
                                                    type='text'
                                                    id="inputPassword"
                                                    name='password'
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    className="form-control form-control-sm"
                                                />

                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label
                                                htmlFor="buttonSubmit"
                                                className="col-sm-2 col-form-label"
                                            />
                                            <div className="col-sm-10">
                                                <button
                                                    type='submit'
                                                    disabled={isSubmitting}
                                                    className="btn btn-danger"
                                                >
                                                    SignUp
                                            </button>
                                            </div>
                                        </div>
                                    </form>
                                )
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

export default SignUpForm;
