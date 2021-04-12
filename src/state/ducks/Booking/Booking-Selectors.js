/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
// get full date-time selectors
export const getSelectedDateTime = (state) => state.booking?.dateTime || '';
export const getLocationData = (state) => state.booking?.location || {};
export const getServicesData = (state) => state.booking?.services?.serviceData || [];
export const getNumberOfGuests = (state) => state.booking?.guests;
export const isGuestWithDifferentServices = (state) => state.booking?.services?.guestsWithDifferentServices;
export const getAddOnsServiceData = (state) => state.booking?.addonsData || [];
export const getIsEditEnabled = (state) => state.booking?.editEnabled || false;
export const getNotesMessage = (state) => state.booking?.notesMessage || '';

export const getAddonsByUser = (state, user) => state.booking.addonsData?.find((data) => data.user === user)?.data || [];
export const getSelectedDate = (state) => state.booking.dateTime || '';
export const getSelectedSlot = (state) => state.booking.slotTime || '';
export const getExtensions = (state) => state.booking.extensions;
export const getServicesDataFormatted = (state) => {
    const servicesData = getServicesData(state) || [];
    const formattedData = {};
    const { ID, EmployeeIDs, RoomIDs } = servicesData[0]?.data || {};
    // TODO temporary 0th index for developement
    formattedData.serviceId = ID;
    formattedData.employeeId = EmployeeIDs?.[0];
    formattedData.roomId = RoomIDs?.[0];

    return formattedData;
};

export const isDataSelected = (state, type) => {
    switch (type) {
    case 'Date/Time':
        {
            const servicesData = getServicesData(state);
            if (servicesData.length) {
                return true;
            }
        }
        return false;
    case 'Review':
    {
        const servicesData = getServicesData(state);
        const date = getSelectedDate(state);
        const slot = getSelectedSlot(state);
        if (date !== '' && slot !== '' && servicesData.length) {
            return true;
        }
        return false;
    }
    default:
        return true;
    }
};
export default {};
