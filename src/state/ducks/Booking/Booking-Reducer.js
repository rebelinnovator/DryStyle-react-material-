import createState from 'redux-create-state';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // defaults to localStorage for web and AsyncStorage for react-native-
import utils from '../../utils';
import { handleAddonsData, handleServicesData } from '../../utils/helpers';

import * as bookingActions from './Booking-Actions';

export const INITIAL_STATE = {
    location: {},
    dateTime: '',
    slotTime: '',
    services: {
        guestsWithDifferentServices: false,
        serviceData: [],
    },
    addonsData: [],
    guests: null,
    editEnabled: false,
    notesMessage: [],
    extensions: null,
};

const bookingPersistConfig = {
    key: 'booking',
    storage,
};

export default persistReducer(bookingPersistConfig, utils.createReducer(INITIAL_STATE)({
    [bookingActions.setDateTimeClient().type]: (state, action) => createState(state || INITIAL_STATE, ['dateTime', action.payload]),
    [bookingActions.setLocationData().type]: (state, action) => createState(state || INITIAL_STATE, ['location', action.payload]),
    [bookingActions.setBookingService().type]: (state, action) => createState(state || INITIAL_STATE, ['services.serviceData', handleServicesData(state, action.payload)]),
    [bookingActions.overwriteServicesData().type]: (state, action) => createState(state || INITIAL_STATE, ['services.serviceData', action.payload]),
    // set add-ons selected data
    [bookingActions.setAddOnsServiceUser().type]: (state, action) => createState(state || INITIAL_STATE, ['addonsData', handleAddonsData(state, action.payload)]),

    [bookingActions.setNumberOfGuests().type]: (state, action) => createState(state || INITIAL_STATE, ['guests', action.payload]),
    [bookingActions.setDifferentServiceEachUser().type]: (state, action) => createState(state || INITIAL_STATE, ['services.guestsWithDifferentServices', action.payload]),
    [bookingActions.resetOnGuestChange().type]: (state) => createState(state || INITIAL_STATE, ['services', INITIAL_STATE.services], ['addonsData', INITIAL_STATE.addonsData]),
    [bookingActions.setSlotTime().type]: (state, action) => createState(state || INITIAL_STATE, ['slotTime', action.payload]),
    [bookingActions.clearBookingDetails().type]: () => INITIAL_STATE,
    [bookingActions.setEditEnabled().type]: (state, action) => createState(state || INITIAL_STATE, ['editEnabled', action.payload]),
    [bookingActions.setRequestNoteMessage().type]: (state, action) => createState(state || INITIAL_STATE, ['notesMessage', action.payload]),
    [bookingActions.setExtensions().type]: (state, action) => createState(state || INITIAL_STATE, ['extensions', action.payload]),
}));
