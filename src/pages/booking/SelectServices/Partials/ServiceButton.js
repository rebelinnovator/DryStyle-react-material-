/* eslint-disable max-len */
import {
    Button, Grid, Tooltip, Typography, withStyles,
} from '@material-ui/core';
import {
    bool, func, number, object, string,
} from 'prop-types';
import React, { useState } from 'react';
import InfoIcon from '@material-ui/icons/Info';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setBookingService } from '../../../../state/ducks/Booking/Booking-Actions';
import TreatmentDetailsModal from '../../../../app/Components/TreatmentDetailsModal';
import mockImage from '../../../../assets/mockImage.png';

const styles = (theme) => ({
    buttonsWrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        padding: '60px',
    },
    button: {
        width: '438px',
        height: '73px',
        margin: '12px 28px',
        backgroundColor: theme.palette.common.white,
        textTransform: 'none',
        fontSize: '18px',
        padding: '14px',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    selected: {
        backgroundColor: theme.palette.primary.main,
        fontWeight: '800',
        '&:hover': {
            backgroundColor: theme.palette.common.hover[1],
        },
    },
    serviceName: {
        fontSize: '18px',
        // fontWeight: '800',
    },
    selectedServiceName: {
        fontSize: '18px',
        fontWeight: '800',
    },
    icon: {
        fontSize: '20px',
        color: '#42413D',
        cursor: 'pointer',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            //margin: '0px 0px 0px 267px',
            //width: '402px',
            witdth:'100%',
            height: '83px',
        },
    },
    tooltipService: {
        fontSize: '20px',
    },
});

// temporary images
const modalImages = [
    'https://s3-alpha-sig.figma.com/img/5bcc/0761/5dd7ad12ae3a5d59735285a4a5e65ad2?Expires=1609718400&Signature=SsNbW0Z34oqdMcOdmyoYaloVffRYTClUdQDmt54QZxkRtYAkNLMatQTaBvE5PF75AYNKI5FfGgk41WRyMbHRZXUoy~mHbIa9f4O3k-VGuPYVbxpayIoFMC7M2Zfr7DZbcpetK~Y6wQLlLjMNKwuUSMW7bvDp6cud4uFAHuw20qwORXaNfogw584bLJ9a5AJs9-xEmOClOpzbD0BAW1MtsHsWCUNOe7R4oBUccza0ME0Ws-401vl78mR0opYuuQLj7sYcpLSAfEcH948RKyKl0PcFLH5ajx01eIbAoP0FOihZnfrHLATdFJ4x-H7OMuto1JwXx-srY9nqn5McLKf6zg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    mockImage,
    'https://s3-alpha-sig.figma.com/img/d5c8/5732/11c1a43e37340635d175dc261e5546e9?Expires=1609718400&Signature=CyPty6EEJPawWa5K8pSaGZDnz4KRh0tHLOjHYdAQNY~m3tqrUvfdEzVc4SgPgF24KhzBaE74pxs4dyTd75Xk35jLe7MIbfUqqGl7mVS6-wgtJZE7St4HW-~kYY9~CCvBdTK1~3XasXTgxYN2r5OA7vnDb~wnKya6-HbJdyM6m1fKR-hrHZITphcnLMd02Q8s0IpJX3FcI8QWEQ7LTFlo53i0ywfd-rhFxNNfBPkaIkLM9td1mwLhg48OwtNGCWAsDeIItbsUjxaAcXm-1k3U-0MaaIesomzPe~GUXVY5Y4MWqZQUXKAiJtOcb7oDZCl7J0gsUiCPs7e4wCq-xGEm0Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
];

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Pro in gravida dolor sit amet lacus accumsan et viverra justo. Donec nunc dui, varius eget nisi et, convallis bibendum est. Nulla vel odio quis nisi finibus rutrum. Sed nec ex sit amet turpis finibus tristique. Cras porta dictum varius.';

const ServiceButton = ({
    isSelected,
    classes,
    service,
    differentServicesSelected,
    guests,
    setSelectedService,
    selectedGuest,
    setAllToSameService,
    goToNextPage,
}) => {
    const [detailsModal, setDetailsModal] = useState(false);

    return (
        <>
            {detailsModal ? (
                <TreatmentDetailsModal
                    title={service.Name}
                    price={service.Price.Amount}
                    onClose={() => setDetailsModal(false)}
                    images={modalImages}
                    description={description}
                    duration={service}
                />
            ) : null}
            <Grid className={classes.buttonContainer}>
                <Tooltip
                    title={service.DurationType.Name}
                    placement="left-start"
                    className={classes.tooltipService}
                    onClick={() => setDetailsModal(true)}
                >
                    <InfoIcon className={classes.icon} />
                </Tooltip>
                <Button
                // Create a function to handle this
                    onClick={() => {
                        if (guests) {
                            if (!differentServicesSelected) {
                                setAllToSameService(service);
                                goToNextPage();
                            } else {
                                setSelectedService({
                                    user: selectedGuest || 'Me',
                                    data: service,
                                });
                            }
                        } else {
                            setSelectedService({
                                user: selectedGuest || 'Me',
                                data: service,
                            });
                            goToNextPage();
                        }
                    }}
                    className={`${classes.button} ${isSelected ? classes.selected : ''}`}
                    variant="outlined"
                >
                    <Grid>
                        <Typography className={isSelected ? classes.selectedServiceName : classes.serviceName}>
                            {service.Name}
                        </Typography>
                        <Typography>
                            {
                                !differentServicesSelected && guests
                                    ? `$${service.Price.Amount} x ${1 + guests} = $${service.Price.Amount * (1 + guests)}`
                                    : `$${service.Price.Amount}`
                            }
                        </Typography>
                    </Grid>
                </Button>
            </Grid>
        </>
    );
};

ServiceButton.propTypes = {
    classes: object.isRequired,
    isSelected: bool,
    service: object.isRequired,
    differentServicesSelected: bool,
    guests: number,
    setSelectedService: func.isRequired,
    selectedGuest: string,
    setAllToSameService: func,
    goToNextPage: func,
};

ServiceButton.defaultProps = {
    differentServicesSelected: true,
    guests: 0,
    selectedGuest: 'Me',
    isSelected: false,
    setAllToSameService: () => {},
    goToNextPage: () => {},
};

const mapDispatchToProps = (dispatch) => ({
    setSelectedService: bindActionCreators(setBookingService, dispatch),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(ServiceButton));
