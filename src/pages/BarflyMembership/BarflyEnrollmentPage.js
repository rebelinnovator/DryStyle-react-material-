import {
    Box,
    Button,
    Grid, TextField, Typography, withStyles,
} from '@material-ui/core';
import {object} from 'prop-types';
import React, {useEffect, useState} from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link, withRouter} from 'react-router-dom';
import Media from 'react-media';
import {withOktaAuth} from '@okta/okta-react';
import {MOBILE_BREAKPOINT} from '../../Helpers/breakpoints';
import usStates from './Partials/usStates.json';
import BackdropCircularProgress from '../../app/Components/common/BackdropCircularProgress';

const styles = (theme) => ({
    container: {
        maxWidth: '1367px',
        width: '100%',
        margin: 'auto',
        padding: '34px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            padding: '19px',
        },
    },
    fieldContainer: {
        backgroundColor: '#fff',
        padding: '15px 21px 25px 21px',
        margin: '10px 0 35px',
    },
    textField: {
        width: '100%',
        margin: '14px 15px',
        '& input': {
            padding: '10px 0',
            fontSize: '20px',
        },
        '& label': {
            fontSize: '18px',
        },
        '& select': {
            padding: '10px 0',
            fontSize: '20px',
        },
        '& option': {
            padding: '15px',
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '14px 8px',
        },
    },
    singleLineTextFieldsContainer: {
        display: 'flex',
    },
    fieldContainerTitle: {
        fontFamily: 'MrsEavesSmallCaps',
        color: '#42413D',
        fontSize: '16px',
    },
    mainTitle: {
        textTransform: 'uppercase',
        fontFamily: 'DINCondensed',
        fontSize: '42px',
        color: '#42413D',
        fontWeight: '600',
        width: '100%',
        textAlign: 'center',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '31px',
        },
    },
    titleContainer: {
        display: 'flex',
    },
    displayFlex: {
        display: 'flex',
        alignItems: 'center',
        color: '#42413D',
    },
    subTitle: {
        textAlign: 'center',
        fontSize: '18px',
        marginBottom: '25px',
        fontWeight: '400',
        textTransform: 'none',
        fontFamily: 'AvenirNext',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
        },
    },
    submitButton: {
        maxWidth: '378px',
        width: '100%',
        height: '63px',
        fontSize: '18px',
        margin: 'auto',
    },
    addressOneWidth: {
        width: '70%',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '100%',
        },
    },
    addressTwoWidth: {
        width: '30%',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '100%',
        },
    },
});

const monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const yearArray = [2020, 2021, 2022, 2023];

// TODO make this component dynamic - remove repetition
const BarflyEnrollmentPage = ({classes, oktaAuth, history}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        oktaAuth.getUser().then((res) => {
            setUser(res);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <BackdropCircularProgress/>;
    }

    const goToConfirmBarfly = () => (
        history.push('/barfly-confirm')
    );

    if (user) {
        return (
            <Grid className={classes.container}>
                <Media
                    query={{maxWidth: MOBILE_BREAKPOINT}}
                >
                    {
                        (matches) => (matches
                            ? (
                                <Grid className={classes.titleContainer}>
                                    <Grid style={{paddingTop: '12px'}}>
                                        <Link to="/barfly-membership" className={classes.displayFlex}>
                                            <ArrowBackIosIcon style={{fontSize: '34px'}}/>
                                        </Link>
                                    </Grid>
                                    <Typography className={classes.mainTitle}>
                                        <Box>
                                            Lets Get
                                        </Box>
                                        <Box>
                                            A Bit More Information
                                        </Box>
                                        <Box className={classes.subTitle}>
                                            and complete your barfly membership
                                        </Box>
                                    </Typography>
                                </Grid>
                            )
                            : (
                                <Grid className={classes.titleContainer}>
                                    <Grid style={{paddingTop: '12px'}}>
                                        <Link to="/barfly-membership" className={classes.displayFlex}>
                                            <ArrowBackIosIcon style={{fontSize: '34px'}}/>
                                            <Typography style={{
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                paddingTop: '2px'
                                            }}>Back</Typography>
                                        </Link>
                                    </Grid>
                                    <Typography className={classes.mainTitle}>
                                        Lets Get A Bit More Information
                                        <Box className={classes.subTitle}>
                                            and complete your barfly membership
                                        </Box>
                                    </Typography>
                                </Grid>
                            ))
                    }
                </Media>

                <Typography className={classes.fieldContainerTitle}>GENERAL INFORMATION</Typography>
                <Grid className={classes.fieldContainer}>
                    <Grid className={classes.singleLineTextFieldsContainer}>
                        <TextField
                            label="First Name"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={user.given_name}
                        />
                        <TextField
                            label="Last Name"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={user.family_name}
                        />
                    </Grid>
                    <Grid className={classes.singleLineTextFieldsContainer}>
                        <TextField
                            label="Email"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={user.email}
                        />
                    </Grid>
                    <Media
                        query={{maxWidth: MOBILE_BREAKPOINT}}
                    >
                        {
                            (matches) => (matches
                                ? (
                                    <>
                                        <Grid className={classes.singleLineTextFieldsContainer}>
                                            <TextField
                                                label="Address 1"
                                                className={`${classes.textField} ${classes.addressOneWidth}`}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid className={classes.singleLineTextFieldsContainer}>

                                            <TextField
                                                label="Address 2"
                                                className={`${classes.textField} ${classes.addressTwoWidth}`}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    </>
                                )
                                : (
                                    <Grid className={classes.singleLineTextFieldsContainer}>
                                        <TextField
                                            label="Address 1"
                                            className={`${classes.textField} ${classes.addressOneWidth}`}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            label="Address 2"
                                            className={`${classes.textField} ${classes.addressTwoWidth}`}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                ))
                        }
                    </Media>

                    <Grid className={classes.singleLineTextFieldsContainer}>
                        <TextField
                            label="City"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            select
                            label="State"
                            // value={currency}
                            // onChange={handleChange}
                            className={classes.textField}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            {usStates.map((state) => (
                                <option style={{padding: '20px'}} key={state['alpha-2']} value={state.name}>
                                    {state.name}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid className={classes.singleLineTextFieldsContainer}>
                        <TextField
                            label="Postal Code"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Phone Number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Typography className={classes.fieldContainerTitle}>PAYMENT INFORMATION</Typography>
                <Grid className={classes.fieldContainer}>
                    <Grid className={classes.singleLineTextFieldsContainer}>
                        <TextField
                            label="Name on Card"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid className={classes.singleLineTextFieldsContainer}>
                        <TextField
                            label="Credit Card Number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid className={classes.singleLineTextFieldsContainer}>
                        <TextField
                            label="City"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            select
                            label="State"
                            // value={currency}
                            // onChange={handleChange}
                            className={classes.textField}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            {usStates.map((state) => (
                                <option style={{padding: '20px'}} key={state['alpha-2']} value={state.name}>
                                    {state.name}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid className={classes.singleLineTextFieldsContainer}>
                        <TextField
                            label="CVV"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            select
                            label="Month"
                            // value={currency}
                            // onChange={handleChange}
                            className={classes.textField}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            {monthArray.map((month) => (
                                <option style={{padding: '20px'}} key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Year"
                            // value={currency}
                            // onChange={handleChange}
                            className={classes.textField}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            {yearArray.map((year) => (
                                <option style={{padding: '20px'}} key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </TextField>

                    </Grid>
                </Grid>
                <Typography className={classes.fieldContainerTitle}>DATE OF BIRTH</Typography>
                <Typography style={{color: '#767676', fontSize: '13px'}}>Make sure you get your free birthday
                    blowout!</Typography>
                <Grid className={classes.fieldContainer}>
                    <Grid className={classes.singleLineTextFieldsContainer}>
                        <TextField
                            label="Month"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Day"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Year"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid style={{
                    width: '100%', display: 'flex', alignItems: 'center', padding: '30px',
                }}
                >
                    <Button variant="contained" color="primary" className={classes.submitButton}
                            onClick={() => goToConfirmBarfly()}>
                        Review And Complete
                    </Button>
                </Grid>
            </Grid>
        );
    }
    return null;
};

BarflyEnrollmentPage.propTypes = {
    classes: object.isRequired,
    oktaAuth: object.isRequired,
    history: object.isRequired,
};

export default withRouter(withStyles(styles)(withOktaAuth(BarflyEnrollmentPage)));
