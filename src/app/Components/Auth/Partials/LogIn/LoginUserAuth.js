/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
    Button, Grid,
    Input, Typography,
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { object } from 'prop-types';
import { withOktaAuth } from '@okta/okta-react';
import SectionTitle from '../../../SectionTitle';
import LoginGoogleFacebook from '../LoginWithGoogleFacebook/LoginGoogleFBContainer';

const LogIn = ({
    classes, oktaAuth, authState, history,
}) => {
    const [email, setEmailValue] = useState('');
    const [password, setPassword] = useState('');
    const [hideShowPassword, setHideShowPass] = useState(true);
    const [errors, setErrors] = useState({});
    const handleEmailChange = (e) => {
        const newError = { ...errors };
        delete newError.email;
        setErrors(newError);
        setEmailValue(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const newError = { ...errors };
        delete newError.password;
        setErrors(newError);
        setPassword(e.target.value);
    };

    const handleHideShowPassword = () => {
        setHideShowPass(!hideShowPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newError = { ...errors };
        delete newError.signin;
        if (!password?.length) {
            newError.password = 'Password is required';
        } else {
            delete newError.password;
        }
        if (!email?.length) {
            newError.email = 'Email is required';
        } else {
            delete newError.email;
        }

        setErrors(newError);
        if (!Object.keys(newError).length) {
            oktaAuth.signIn({ username: email, password }).then((response) => {
                if (response) {
                    oktaAuth.signInWithRedirect({
                        sessionToken: response.sessionToken,
                    });
                }
            }).catch((err) => setErrors({ signin: err.errorSummary }));
        }
    };

    const handleSocialLogin = async (idp) => {
        oktaAuth.token.getWithRedirect({
            scopes: [
                'openid',
                'email',
                'profile',
            ],
            // Use a custom IdP for social authentication
            idp,
        })
            .then((res) => {
                const { tokens } = res;

                // Do something with tokens, such as
                oktaAuth.tokenManager.setTokens(tokens);
            })
            .catch((err) => {
            // handle OAuthError or AuthSdkError
                console.log('log in error-->', err);
            });
    };

    if (authState.isPending) {
        return null;
    }
    if (authState.isAuthenticated) {
        history.push('/');
    }

    return (
        <>
            <Grid container className={classes.requestServiceContainer}>
                <SectionTitle title="LOG IN" />
                <Grid className={classes.requestNoteDetails}>
                    <Grid className={classes.requestContainer}>
                        <form onSubmit={handleSubmit} className={classes.subscribeEmailForm}>
                            <Grid>
                                <Grid className={classes.fieldsContainer}>
                                    <Typography className={classes.enterEmailPasswordCopy}>Email</Typography>
                                    <Input
                                        classes={{
                                            input: classes.input,
                                        }}
                                        id="standard-adornment-amount"
                                        error={errors.email}
                                        value={email}
                                        onChange={(e) => handleEmailChange(e)}
                                        startAdornment=""
                                        placeholder="Your email here..."
                                        className={classes.enterYourEmail}
                                    />
                                    <Grid className={classes.enterEmailPassword}>
                                        <Typography className={classes.enterEmailPasswordCopy}>Password</Typography>
                                        <Input
                                            classes={{
                                                input: classes.input,
                                            }}
                                            id="standard-adornment-amount"
                                            value={password}
                                            onChange={(e) => handlePasswordChange(e)}
                                            startAdornment=""
                                            placeholder="Your password here..."
                                            type={hideShowPassword ? 'password' : 'text'}
                                            className={classes.enterYourEmail}
                                            error={errors.password}
                                            endAdornment={(
                                                <InputAdornment position="start">
                                                    {hideShowPassword ? <VisibilityIcon className={classes.visibilityIcon} onClick={() => handleHideShowPassword()} /> : <VisibilityOffIcon className={classes.visibilityIcon} onClick={() => handleHideShowPassword()} />}
                                                </InputAdornment>
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {errors.signin ? (
                                <Typography color="error">
                                    {errors.signin}
                                </Typography>
                            ) : null}
                            <Button type="submit" className={classes.authOperation} variant="outlined">
                                Log In
                            </Button>
                        </form>
                        <Link to="/auth/sign-up"><Typography className={classes.recoverPassword}>Sign Up</Typography></Link>
                    </Grid>
                </Grid>
            </Grid>
            <LoginGoogleFacebook handleSocialLogin={handleSocialLogin} classes={classes} />
        </>
    );
};

LogIn.prototype = {
    classes: object.isRequired,
};

export default withRouter(withOktaAuth(LogIn));
