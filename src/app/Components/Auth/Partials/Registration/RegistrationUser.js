/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Button, Grid,
    Typography,
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import Axios from 'axios';
import SectionTitle from '../../../SectionTitle';
import LoginGoogleFacebook from '../LoginWithGoogleFacebook/LoginGoogleFBContainer';
import appConfig from '../../../../../app.config';
import TextInputField from '../TextInputField';
import signupFormFields from './signupFormFields';

const styles = (theme) => ({
    requestNoteDetails: {
        float: 'right',
        background: theme.palette.common.white,
        boxShadow: '2px 2px 17px rgba(235, 235, 235, 0.5)',
        margin: 'auto',
        maxWidth: '800px',
        padding: '30px 22px',
        textAlign: 'center',
        width: '754px',
    },
    authOperation: {
        fontSize: '18px',
        lineHeight: '45px',
        color: theme.palette.common.white,
        textTransform: 'capitalize',
        background: '#54575A',
        height: '63px',
        width: '378px',
        marginTop: '40px',
        borderRadius: '0px',
        '&:hover': {
            backgroundColor: 'rgb(58, 60, 62);',
        },
    },
    requestServiceContainer: {
        background: theme.palette.common.lightGrey[3],
        marginBottom: '86px',
    },
    enterYourEmail: {
        width: '100%',
        padding: '7px 0px 0px 0px',

    },
    enterEmailPassword: {
        padding: '29px 0px 0px 0px',
    },
    enterEmailPasswordCopy: {
        float: 'left',
        color: theme.palette.common.lightGrey[4],
    },
    alreadyHaveAccount: {
        color: theme.palette.common.lightGrey[4],
        marginTop: '29px',
    },
    facebookLogin: {
        '& .kep-login-facebook': {
            backgroundColor: theme.palette.common.white,
        },
    },
    backToLogin: {
        color: theme.palette.common.grey,
        textDecoration: 'underline',
        cursor: 'pointer',
        marginLeft: '11px',
    },
    SignUpFormInfo: {
        float: 'right',
        margin: '-54px 0px 0px 0px',
    },
});

const Registration = ({ history, classes }) => {
    const [formFields, setFormFields] = useState({});
    const [errors, setErrors] = useState({});

    // =========todo refactor error handling===============
    const handleErrorUpdate = (field, message) => {
        const newErrors = { ...errors };
        if (field) {
            if (message && message?.length) {
                newErrors[field] = message;
            } else {
                delete newErrors[field];
            }
        } else {
            signupFormFields.forEach((reqFields) => {
                if (reqFields.required) {
                    if (!(formFields[reqFields.name] || formFields[reqFields.name]?.length)) {
                        newErrors[reqFields.name] = `${reqFields.label} is required`;
                    } else {
                        delete newErrors[reqFields.name];
                    }
                }
            });
            if (formFields.password?.length < 8) {
                newErrors.password = 'Password length should be greater than 8';
            }

            if (formFields.password !== formFields.confirmPassword) {
                newErrors.confirmPassword = 'Password did not match';
            }
        }
        return newErrors;
    };

    const handleChange = (value, fieldName) => {
        const updatedFields = { ...formFields };
        updatedFields[fieldName] = value;
        const newErrors = handleErrorUpdate(fieldName);
        setErrors(newErrors);
        setFormFields(updatedFields);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const {
            firstName, lastName, email, password,
        } = formFields;
        const newErrors = handleErrorUpdate();
        if (Object.keys(errors)?.length === 0) {
            Axios({
                method: 'post',
                url: 'https://dev-6150636.okta.com/api/v1/users',
                data: {
                    profile: {
                        firstName,
                        lastName,
                        email,
                        login: email,
                    },
                    credentials: {
                        password: {
                            value: password,
                        },
                    },
                },
                headers: {
                    Authorization: `SSWS ${appConfig.token}`,
                },
            }).then((res) => {
                if (res.data.status === 'STAGED' || res.data.status === 'ACTIVE') {
                    history.push('/auth/login');
                }
            }).catch((err) => {
                const newResErrors = { ...newErrors };
                err.response.data.errorCauses.forEach((cause) => {
                    if (cause?.errorSummary) {
                        const [field, message] = cause?.errorSummary?.split(': ');
                        if (field !== 'login') {
                            newResErrors[field] = message;
                        }
                    }
                });
                setErrors(newResErrors);
            });
        }
    };
    //= ================================================================
    return (
        <>
            <Grid container className={classes.requestServiceContainer}>
                <SectionTitle title="SIGN UP" />
                <Grid className={classes.requestNoteDetails}>
                    <Grid className={classes.requestContainer}>
                        <form onSubmit={handleSignup} className={classes.subscribeEmailForm}>
                            {signupFormFields.map((field, i) => (
                                <Grid className={i !== 0 ? classes.enterEmailPassword : ''}>
                                    <TextInputField
                                        value={formFields[field.name] || ''}
                                        onChange={(e) => handleChange(e.target.value, field.name)}
                                        placeholder={field.placeholder}
                                        className={classes.enterYourEmail}
                                        label={field.label}
                                        error={errors[field.name]?.length}
                                        errorMessage={errors[field.name]}
                                        type={field.type}
                                    />
                                </Grid>
                            ))}
                            <Button type="submit" className={classes.authOperation} variant="outlined">
                                Sign Up
                            </Button>
                        </form>
                        <Typography className={classes.alreadyHaveAccount}>
                            Already have an account?
                            <Link to="/auth/login"><span className={classes.backToLogin}>Log In</span></Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <LoginGoogleFacebook />
        </>
    );
};

export default withRouter(withStyles(styles)(Registration));
