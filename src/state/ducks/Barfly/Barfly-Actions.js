/* eslint-disable import/prefer-default-export */

import barflyActionTypes from './Barfly-ActionTypes';

export const setBarflyMembership = (payload) => ({
    type: barflyActionTypes.BARFLY_SET_MEMBERSHIP,
    payload: payload,
});
