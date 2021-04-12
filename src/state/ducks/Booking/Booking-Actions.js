/* eslint-disable import/prefer-default-export */

import bookingActionTypes from './Booking-ActionTypes';

export const setDateTimeClient = (state) => ({
    type: bookingActionTypes.BOOKING_DATE_TIME,
    payload: state,
});

export const setSlotTime = (state) => ({
    type: bookingActionTypes.BOOKING_SLOT_TIME,
    payload: state,
});

export const setLocationData = (locationData) => ({
    type: bookingActionTypes.BOOKING_LOCATION,
    payload: locationData,
});

export const setBookingService = (service) => ({
    type: bookingActionTypes.BOOKING_SERVICE,
    payload: service,
});

export const setNumberOfGuests = (num) => ({
    type: bookingActionTypes.BOOKING_HOW_MANY,
    payload: num,
});

export const setDifferentServiceEachUser = (payload) => ({
    type: bookingActionTypes.BOOKING_DIFFERENT_SERVICE_FOR_GUEST,
    payload,
});

export const setAddOnsServiceUser = (addons) => ({
    type: bookingActionTypes.BOOKING_ADDONS,
    payload: addons,
});

export const resetOnGuestChange = () => ({
    type: bookingActionTypes.RESET_ON_GUEST_CHANGE,
});

export const overwriteServicesData = (data) => ({
    type: bookingActionTypes.BOOKING_OVERWRITE_SERVICES_DATA,
    payload: data,
});

export const clearBookingDetails = () => ({
    type: bookingActionTypes.BOOKING_CLEAR_DATA,
});

export const loadBookingState = (data) => ({
    type: bookingActionTypes.BOOKING_LOAD_BOOKING_STATE,
    payload: data,
});

export const editOrRebookAppointment = (data) => ({
    type: bookingActionTypes.BOOKING_REBOOK_EDIT_APPOINTMENT,
    payload: data,
});

export const setEditEnabled = (bool) => ({
    type: bookingActionTypes.BOOKING_IS_EDIT_ENABLED,
    payload: bool,
});

export const setRequestNoteMessage = (bool) => ({
    type: bookingActionTypes.BOOKING_REQUEST_NOTES,
    payload: bool,
});

export const setExtensions = (bool) => ({
    type: bookingActionTypes.BOOKING_SET_EXTENSIONS,
    payload: bool,
});
