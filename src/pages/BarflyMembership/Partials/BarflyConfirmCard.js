/* eslint-disable max-len */
import {
    Box,
    Grid, Typography, withStyles, Button,
    DialogTitle, Dialog, DialogContent, Checkbox,
} from '@material-ui/core';
import {object} from 'prop-types';
import React, {useEffect} from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Link} from 'react-router-dom';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';

import {withOktaAuth} from '@okta/okta-react';
import CloseIcon from '@material-ui/icons/Close';
import {MOBILE_BREAKPOINT} from '../../../Helpers/breakpoints';
import BarflyConfirmedMap from '../../../assets/images/barflyConfirmedLocation.svg';
import {doQuery} from "../../../state/utils/contentful";
import {setBarflyMembership} from "../../../state/ducks/Barfly/Barfly-Actions";
import {getBarflyMembershipPrice} from "../../../state/ducks/Barfly/Barfly-Selectors";

const styles = (theme) => ({
    container: {
        maxWidth: '1367px',
        width: '100%',
        margin: 'auto',
        padding: '53px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            padding: '19px',
        },

    },
    mainTitle: {
        textTransform: 'uppercase',
        fontFamily: 'DINCondensed',
        fontSize: '42px',
        color: '#42413D',
        fontWeight: '600',
        width: '100%',
        textAlign: 'center',
        lineHeight: '51px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '31px',
            width: '79%',
            lineHeight: '37px',
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
        margin: '91px 0px 110px 450px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '36px 0px 64px 4px',
        },
    },
    summaryContainer: {
        height: '329px',
        borderRadius: '0px',
        backgroundColor: '#FFFFFF',
        padding: '28px 35px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            backgroundColor: '#F9F9F9',
            height: '203px',
        },
    },
    summaryTitle: {
        fontFamily: 'MrsEavesSmallCaps',
        fontSize: '25px',
        lineHeight: '45px',
        textTransform: 'uppercase',
        color: '#42413D',
        margin: '28px 0px 0px 36px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
            whiteSpace: 'nowrap',
            margin: '0px',
        },
    },
    membershipCharge: {
        height: '197px',
        borderRadius: '0px',
        backgroundColor: '#F7F8F9',
        margin: '16px 0',
        borderTop: '1px solid #D1D1D1',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            backgroundColor: '#FFFFFF',
            height: '136px',
            width: '365px',
            borderRadius: '0px',
            margin: '0px 0px 0px 0px',
        },
    },
    theFinePrint: {
        width: '1269px',
        borderRadius: '0px',
        backgroundColor: '#FFFFFF',
        marginTop: '5px',
        marginBottom: '40px',
        padding: '28px 35px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '365px'
        },
    },
    finePrintCopy: {
        fontFamily: 'AvenirNext',
        fontSize: '17px',
        lineHeight: '32px',
        color: '#42413D',
        padding: '25px 25px 0px 25px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
            lineHeight: '22px',
        },
    },
    finePrintHeading: {
        fontFamily: 'MrsEavesSmallCaps',
        fontSize: '20px',
        lineHeight: '45px',
        color: '#42413D',
        marginTop: '24px !important',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
            lineHeight: '22px',
            marginLeft: '2px',
        },
    },
    slashVector: {
        margin: '0 20px',
        '&::after': {
            content: '""',
            height: '60px',
            transform: 'rotate(20deg)',
            borderRight: '2px solid #42413D',
            position: 'absolute',
        },
    },
    serviceChargeCotainer: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'center',
    },
    servicePriceCopy: {
        border: '1px solid #FFFFFF',
        background: '#FFFFFF',
        borderRadius: '38px',
        fontSize: '24px',
        fontWeight: '800',
        color: '#42413D',
        fontFamily: 'AvenirNext',
        display: 'flex',
        alignItems: 'center',
        borderWidth: '16px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            background: '#F7F8F9',
            width: '76px',
            borderWidth: '0px',
            padding: '12px',
        },

    },
    serviceChargeData: {
        display: 'flex',
        position: 'relative',
        height: '70px',
        margin: '33px 0px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '11px 0px 0px 5px',
        },
    },
    taxApplicable: {
        fontFamily: 'AvenirNext',
        fontSize: '18px',
        lineHeight: '34px',
        color: '#767676',
        margin: '17px 0px 0px 11px',
    },
    monthCopy: {
        fontSize: '28px',
        fontWeight: '800',
        color: '#42413D',
        fontFamily: 'AvenirNext',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '18px',
        },
    },
    drybarLocation: {
        fontFamily: 'AvenirNext',
        fontSize: '18px',
        lineHeight: '34px',
        color: '#42413D',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
            lineHeight: '24px',
        },
    },
    locationDetails: {
        margin: '36px 0px 0px 40px',
    },
    confirmedMap: {
        margin: '-53% 0% 0% 106%',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '-48% 0% 0% 106%',
            width: '134px',
        },
    },
    bookYourAppointmentToday: {
        maxWidth: '378px',
        width: '100%',
        height: '63px',
        fontSize: '18px',
        margin: '4px 0px 15px 248px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '318px',
            height: '55px',
            fontSize: '15px',
            margin: '4px 0px 15px 8px',
        },
    },
    thankYouDesc: {
        borderTop: '1px solid #D1D1D1',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '90%',
            margin: '0px 13px 0px 22px',
        },
    },
    thankYouHeading: {
        fontFamily: 'DINCondensed',
        fontWeight: '700',
        fontSize: '34px',
        lineHeight: '41px',
        textTransform: 'uppercase',
        color: '#42413D',
        width: '100%',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '251px',
            fontSize: '30px',
            lineHeight: '34px',
        },
    },
    dialogContainer: {
        maxWidth: '890px',
        height: '500px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            height: '703px',
        },
    },
    copyDetails: {
        fontFamily: 'AvenirNext',
        fontSize: '16px',
        lineHeight: '32px',
        color: '#42413D',
        marginTop: '10px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
            marginTop: '2px',
            lineHeight: '22px',
            marginLeft: '-23px',
        },
    },
    closeIcon: {
        margin: '20px 0px 0px 30%',
        cursor: 'pointer',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            margin: '34px 0px 0px 1%',
        },
    },
    specialWidth: {
        width: '263px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width: '222px',
            height: '136px',
        },
    },
    backPageCopy: {
        fontSize: '16px',
        fontWeight: '600',
        paddingTop: '2px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            display: 'none',
        },
    },
    modalContainer: {
        background: 'rgba(255, 255, 255, 0.94)',
    },
});

// TODO make this component dynamic - remove repetition
const BarflyConfirmPage = ({classes, barflyConfirmData, price}) => {
    const [open, setOpen] = React.useState(false);
    const [firstCheckboxData, setFirstCheckData] = React.useState('');
    const [secondCheckboxData, setSecondCheckData] = React.useState('');
    const [confirmationData, setConfirmationData] = React.useState('');
    const [firstChecked, setFirstChecked] = React.useState(false);
    const [secondChecked, setSecondChecked] = React.useState(false);

    const finePrintCollection = barflyConfirmData?.finePrint?.json?.content || [];
    const thankYouCollection = barflyConfirmData?.thankYou?.json?.content || [];
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const gplQuery = `{
              channelResourceCollection(where: {slug: "barfly-configurations"}) {
                items {
                  sys {
                    id
                  }
                  configuration
                }
              }
            }
        `;
    useEffect(() => {
        doQuery(gplQuery).then(data => {
            const channelResourceItem = data?.channelResourceCollection?.items || [];
            if (channelResourceItem && channelResourceItem.length > 0) {
                setFirstCheckData((channelResourceItem[0].configuration?.barfly?.checkbox_one || '').replace('${price}', '$' + price));
                setSecondCheckData((channelResourceItem[0].configuration?.barfly?.checkbox_two || '').replace('${price}', '$' + price));
                setConfirmationData((channelResourceItem[0].configuration?.barfly?.confirmation_text || '').replace('${price}', '$' + price));
            }
        });
    }, []);

    return (
        <Grid className={classes.container}>
            <Grid className={classes.titleContainer}>
                <Grid style={{paddingTop: '12px'}}>
                    <Link to="/barfly-membership-enrollment" className={classes.displayFlex}>
                        <ArrowBackIosIcon style={{fontSize: '34px'}}/>
                        <Typography className={classes.backPageCopy}>Back</Typography>
                    </Link>
                </Grid>
                <Typography className={classes.mainTitle}>
                    Let’s confirm your details
                    {' '}
                    <Box className={classes.subTitle}>
                        and finalize your barfly membership
                    </Box>
                </Typography>
            </Grid>
            <Grid container className="justify-content-between">
                <Grid item xs={5} className={classes.summaryContainer}>
                    <Typography className={classes.summaryTitle}>
                        Summary of Charges
                    </Typography>
                    <Grid className={classes.membershipCharge}>
                        <Grid className={classes.serviceChargeCotainer}>
                            <Grid className={classes.serviceChargeData}>
                                <Box className={classes.servicePriceCopy}>
                                    $80
                                </Box>
                                <Box className={classes.slashVector}/>
                                <Box className={classes.monthCopy}>
                                    month
                                </Box>
                                <Typography className={classes.taxApplicable}>
                                    + tax (where applicable)
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={5} className={classes.summaryContainer}>
                    <Typography className={classes.summaryTitle}>
                        Prefered Shop
                    </Typography>
                    <Grid className={`${classes.membershipCharge} ${classes.specialWidth}`}>
                        <Grid className={classes.locationDetails}>
                            <Typography className={classes.drybarLocation} style={{fontWeight: '600'}}>Drybar
                                Brentwood</Typography>
                            <Typography className={classes.drybarLocation}>
                                123 Nowhere street,
                                Brentwood, CA, 90210
                            </Typography>
                        </Grid>
                        <Grid>
                            <img src={BarflyConfirmedMap} alt="confirmed-map" className={classes.confirmedMap}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Typography className={classes.finePrintHeading}>
                THE FINE PRINT
            </Typography>
            <Grid className={classes.theFinePrint}>
                {finePrintCollection.map((fineItems) => (
                    fineItems.content.map((items) => (
                        <Typography className={classes.finePrintCopy}>{items.value}</Typography>
                    ))
                ))}

                <Grid className="checkbox-container">
                    <Typography className="confirmation-section">{confirmationData}</Typography>
                    <Grid className="checkbox-section">
                        <Checkbox
                            checked={secondChecked}
                            onClick={() => setSecondChecked(!secondChecked)}
                            className="checkbox"/>
                        <Typography>{secondCheckboxData}</Typography>
                    </Grid>
                    <Grid className="checkbox-section">
                        <Checkbox
                            checked={firstChecked}
                            onClick={() => setFirstChecked(!firstChecked)}
                            className="checkbox"/>
                        <Typography>{firstCheckboxData}</Typography>
                    </Grid>
                </Grid>

            </Grid>

            <Button variant="contained" color="primary" className={classes.submitButton} onClick={handleClickOpen}>
                Complete Membership
            </Button>
            <Grid>
                <Dialog
                    maxWidth="md"
                    onClose={handleClose}
                    aria-labelledby="max-width-dialog-title"
                    open={open}
                    classes={{
                        paperWidthMd: classes.dialogContainer,
                        container: classes.modalContainer,
                    }}
                >
                    <Grid style={{display: 'flex'}}>
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            <Typography className={classes.thankYouHeading}>
                                {thankYouCollection[0].content[0].value}
                            </Typography>
                        </DialogTitle>
                        <CloseIcon onClick={handleClose} className={classes.closeIcon}/>
                    </Grid>

                    <DialogContent className={classes.thankYouDesc}>
                        {thankYouCollection.map((thanksItems) => (
                            thanksItems?.content?.map((items) => (
                                <Typography className={classes.copyDetails}>
                                    {items.value}
                                </Typography>
                            ))
                        ))}
                    </DialogContent>
                    <Button variant="contained" color="primary" className={classes.bookYourAppointmentToday}
                            onClick={handleClose}>
                        Book Your Appointment Today
                    </Button>
                </Dialog>
            </Grid>
        </Grid>
    );
};

BarflyConfirmPage.propTypes = {
    classes: object.isRequired,
    barflyConfirmData: object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({});

const mapStateToProps = (state) => ({
    price: getBarflyMembershipPrice(state)
});


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withOktaAuth(BarflyConfirmPage)));
