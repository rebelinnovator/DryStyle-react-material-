/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import {
    Button,
    Checkbox, Grid, Tooltip, Typography, withStyles,
} from '@material-ui/core';
import {
    object,
} from 'prop-types';
import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { setAddOnsServiceUser } from '../../../../state/ducks/Booking/Booking-Actions';
import { isGuestWithDifferentServices, getAddOnsServiceData } from '../../../../state/ducks/Booking/Booking-Selectors';
import TreatmentDetailsModal from '../../../../app/Components/TreatmentDetailsModal';

const styles = (theme) => ({
    root: {
        padding: '31px 0',
        backgroundColor: theme.palette.common.white,
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: '550px',
        marginBottom: '12px',
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.06)',
        alignItems: 'center',
        '&:last-child': {
            marginBottom: 0,
        },
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '46%',
            padding: '12px 0',
            marginLeft: '94px',
            minWidth: '346px',
            height: 'auto',
            minHeight: '116px',
        },
    },
    content: {
        textAlign: 'left',
        margin: '0px 0px 0px 27px',
    },
    buttonContainer: {
        maxWidth: '100%',
        width: '100%',
        padding: '0',
        margin: '0 0 10px 0',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '23%',
            width: '43%',
            margin: '3px 0 3px 87px',
        },
    },
    icon: {
        margin: '55px 29px 0px 0px',
        alignSelf: 'flex-start',
        fontSize: '20px',
        color: theme.palette.common.grey,
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            margin: '39px 18px 0px 15px',

        },
    },
    addOnName: {
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
            marginLeft: '0px',
        },
    },
    description: {
        fontStyle: 'oblique',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0px',
            fontSize: '15px',
            whiteSpace: 'initial',
        },
    },
    price: {
        fontSize: '22px',
        fontWeight: '600',
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
            marginLeft: '0px',
        },
    },
    checkbox: {
        fontSize: '33px',
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.common.white,
        },
    },
    checkboxRoot: {
        height: 'fit-content',
        width: 'fit-content',
        marginRight: '25px',
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.common.white,
        },
        '&.MuiCheckbox-colorSecondary.Mui-checked:hover': {
            backgroundColor: theme.palette.common.white,
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: '5px',

        },
    },
    displayFlex: {
        display: 'flex',
    },
});
// const [checked, setChecked] = useState(false);
// const [selected, setSelected] = useState(selectedAddonsServices || []);

// const addonsDescription = addon?.Description || 'Brightens, adds shine & removes dullness.';
// const addonsPrice = addon?.Price?.Amount > 0 ? addon.Price.Amount : 10;

// const setAllToSameService = (service) => {
//     const newServices = [];
//     for (let i = 0; i < guests + 1; i += 1) {
//         if (i === 0) {
//             newServices.push({ user: 'Me', service });
//         } else {
//             newServices.push({ user: `Guest ${i}`, service });
//         }
//     }
//     return newServices;
// };

// useEffect(() => {
//     if (!guests && selectedAddonsServices.length) {
//         setAddonsService([selectedAddonsServices.find((s) => s.user === 'Me')] || []);
//     }
// });

// const handleAddonsData = (service) => {
//     setChecked(!checked);
//     let newServices = [];
//     if (guests && isDifferentServiceEnabled) {
//         newServices = setAllToSameService(service);
//     } else if (guests) {
//         const oldServ = [...selected].filter((s) => s.user !== service.user);
//         oldServ?.push(service);
//         newServices = [...oldServ];
//     } else {
//         newServices = [service];
//     }
//     setSelected(newServices);
//     setAddonsService(newServices);
// };

const modalImages = [
    'https://s3-alpha-sig.figma.com/img/5bcc/0761/5dd7ad12ae3a5d59735285a4a5e65ad2?Expires=1609718400&Signature=SsNbW0Z34oqdMcOdmyoYaloVffRYTClUdQDmt54QZxkRtYAkNLMatQTaBvE5PF75AYNKI5FfGgk41WRyMbHRZXUoy~mHbIa9f4O3k-VGuPYVbxpayIoFMC7M2Zfr7DZbcpetK~Y6wQLlLjMNKwuUSMW7bvDp6cud4uFAHuw20qwORXaNfogw584bLJ9a5AJs9-xEmOClOpzbD0BAW1MtsHsWCUNOe7R4oBUccza0ME0Ws-401vl78mR0opYuuQLj7sYcpLSAfEcH948RKyKl0PcFLH5ajx01eIbAoP0FOihZnfrHLATdFJ4x-H7OMuto1JwXx-srY9nqn5McLKf6zg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    'https://s3-alpha-sig.figma.com/img/d5c8/5732/11c1a43e37340635d175dc261e5546e9?Expires=1609718400&Signature=CyPty6EEJPawWa5K8pSaGZDnz4KRh0tHLOjHYdAQNY~m3tqrUvfdEzVc4SgPgF24KhzBaE74pxs4dyTd75Xk35jLe7MIbfUqqGl7mVS6-wgtJZE7St4HW-~kYY9~CCvBdTK1~3XasXTgxYN2r5OA7vnDb~wnKya6-HbJdyM6m1fKR-hrHZITphcnLMd02Q8s0IpJX3FcI8QWEQ7LTFlo53i0ywfd-rhFxNNfBPkaIkLM9td1mwLhg48OwtNGCWAsDeIItbsUjxaAcXm-1k3U-0MaaIesomzPe~GUXVY5Y4MWqZQUXKAiJtOcb7oDZCl7J0gsUiCPs7e4wCq-xGEm0Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
];

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Pro in gravida dolor sit amet lacus accumsan et viverra justo. Donec nunc dui, varius eget nisi et, convallis bibendum est. Nulla vel odio quis nisi finibus rutrum. Sed nec ex sit amet turpis finibus tristique. Cras porta dictum varius.';

// we need user type the service is added for
// we need the addOn data selected
// if same for all, set for all
const AddOnCard = ({
    classes,
    addonData,
    selectedUser,
    isSelectedForUser,
    setSelectedAddonForUser, // setAddonsService, guests, selectedAddonsServices, isDifferentServiceEnabled, selectedUser,
}) => {
    const [detailsModal, setDetailsModal] = useState(false);
    const addonsDescription = addonData?.Description || 'Brightens, adds shine & removes dullness.';
    const addonsPrice = addonData?.Price?.Amount > 0 ? addonData.Price.Amount : 10;

    const [selected, setSelected] = useState(isSelectedForUser || false);

    const handleClick = (addOn) => {
        const addOnObj = {
            user: selectedUser,
            data: addOn,
        };
        setSelected(!selected);
        setSelectedAddonForUser(addOnObj);
    };

    return (
        <>
            {detailsModal ? (
                <TreatmentDetailsModal
                    title={addonData.Name}
                    price={addonData.Price.Amount}
                    onClose={() => setDetailsModal(false)}
                    images={modalImages}
                    description={description}
                    duration={addonData}
                />
            ) : null}
            <Grid className={classes.displayFlex}>
                <Tooltip
                    title={addonData.DurationType.Name}
                    placement="left-start"
                    onClick={() => setDetailsModal(true)}
                >
                    <InfoIcon className={classes.icon} />
                </Tooltip>
                <Button
                    variant="contained"
                    className={classes.buttonContainer}
                    onClick={() => handleClick(addonData)}
                    disableRipple
                >
                    <Grid className={classes.root}>
                        <Grid className={classes.content}>
                            <Typography className={classes.addOnName}>
                                {addonData.Name}
                            </Typography>
                            <Typography className={classes.description}>
                                {addonsDescription}
                            </Typography>
                            <Typography className={classes.price}>
                                $
                                {addonsPrice}
                            </Typography>
                        </Grid>
                        <Checkbox
                            checked={selected}
                            className={classes.checkboxRoot}
                            checkedIcon={<CheckCircleIcon className={classes.checkbox} />}
                            icon={<RadioButtonUncheckedIcon className={classes.checkbox} />}
                        />
                    </Grid>
                </Button>
            </Grid>
        </>
    );
};

AddOnCard.propTypes = {
    classes: object.isRequired,
};

const mapStateToProps = (state) => ({
    isDifferentServiceEnabled: isGuestWithDifferentServices(state),
    selectedAddonsServices: getAddOnsServiceData(state),
});

const mapDispatchToProps = (dispatch) => ({
    setSelectedAddonForUser: bindActionCreators(setAddOnsServiceUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddOnCard));
