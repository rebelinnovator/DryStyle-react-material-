/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React from 'react';
import { useQuery } from '@apollo/client';
import { func } from 'prop-types';
import {
    CircularProgress, Backdrop,
} from '@material-ui/core';
import ConnectedSelectLocator from './ServiceStoreLocatorContainer';
import StoreCollection from '../../../gql/queries/storeCollection';

const SelectStoreLocation = ({ goToNextPage }) => {
    const LOCATION_QUERY = StoreCollection();
    const { data, error, loading } = useQuery(LOCATION_QUERY);
    if (loading) {
        return (
            // todo - replace with skeleton
            <Backdrop
                open
                style={{
                    zIndex: 11,
                    color: '#fff',
                }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (error) {
        console.log('errror ===>', error);
    }

    if (data) {
        const storeCollectionMetaData = data.storeCollection?.items || [];
        return (
            <div>
                <ConnectedSelectLocator storeCollectionData={storeCollectionMetaData} goToNextPage={goToNextPage} />
            </div>
        );
    }
    return null;
};

SelectStoreLocation.propTypes = {
    goToNextPage: func.isRequired,
};

export default (SelectStoreLocation);
