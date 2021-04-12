import createState from 'redux-create-state';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // defaults to localStorage for web and AsyncStorage for react-native-
import utils from '../../utils';

import * as barflyActions from './Barfly-Actions';

export const INITIAL_STATE = {
    membership: {}
};

const homePersistConfig = {
    key: 'barfly',
    storage,
};

export default persistReducer(homePersistConfig, utils.createReducer(INITIAL_STATE)({
    [barflyActions.setBarflyMembership().type]: (state, action) => createState(state || INITIAL_STATE,
        ['membership', action.payload])
    ,
}));
