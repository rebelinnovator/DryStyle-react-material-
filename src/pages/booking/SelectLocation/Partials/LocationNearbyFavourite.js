import React, { useState } from 'react';
import {
    Button,
    Grid, InputAdornment, TextField, Typography, Checkbox,
} from '@material-ui/core';
import { array, object, func } from 'prop-types';
import { withRouter } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import LocationCard from './LocationCard';

const LocationSelection = ({
    classes, locationData, onLocationSelect, location,
}) => {
    const [locationType, setLocationType] = useState('nearby');
    const [searchLocation, setSearchLocation] = useState('');
    const isLocatorService = location?.pathname?.includes('/service/locator');
    const storeLocatorName = locationData.map((item) => item.name);

    // if (searchLocation !== '' && storeLocatorName.name.indexOf(searchLocation) === -1) {
    //     return <h1>there is not res</h1>;
    // }

    const handleLocationSearch = (e) => {
        setSearchLocation(e.target.value);
    };

    return (
        <>
            <Grid className={classes.leftContent}>
                <Grid className={classes.searchField}>
                    <TextField
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            classes: {
                                root: classes.searchFieldHeight,
                            },
                        }}
                        placeholder="City, State or Zip"
                        onChange={(e) => handleLocationSearch(e)}
                    />
                    <Button className={classes.searchButton} variant="outlined">Search</Button>
                </Grid>
                {/* Location Type */}
                {!isLocatorService ? (
                    <Grid>
                        <Button variant="outlined" className={`${classes.locationTypeButton} ${locationType === 'nearby' ? classes.selected : ''}`} onClick={() => setLocationType('nearby')}>
                            Nearby
                        </Button>
                        <Button variant="outlined" className={`${classes.locationTypeButton} ${locationType === 'favorite' ? classes.selected : ''}`} onClick={() => setLocationType('favorite')}>
                            Favorite
                        </Button>
                    </Grid>
                ) : (
                    <Grid className={classes.displayFlex}>
                        <Checkbox
                            defaultChecked
                            color="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                            style={{ marginTop: '-17px' }}
                        />
                        <Typography style={{ marginTop: '-6px' }}>
                            Drybar Product Retail locations
                        </Typography>
                    </Grid>
                )}

                {searchLocation !== '' && storeLocatorName?.toString().toLowerCase().indexOf(searchLocation.toLowerCase()) === -1 ? (
                    <Grid className={classes.notFoundLocator}>
                        <Typography className={classes.notResultFoundCopy}>
                            No Results Found.
                        </Typography>
                        <Typography className={classes.searchAnotherLocation}>
                            Try to seach for another close location.
                        </Typography>
                    </Grid>

                ) : (
                    locationData.map((data) => (
                        <Grid className={classes.locationMap}>
                            <LocationCard
                                onLocationSelect={onLocationSelect}
                                key={`${data.lat}`}
                                locationData={data}
                                searchLocation={searchLocation}
                            />
                        </Grid>
                    ))
                )}
            </Grid>
        </>
    );
};

LocationSelection.propTypes = {
    classes: object.isRequired,
    locationData: array.isRequired,
    onLocationSelect: func.isRequired,
    location: object.isRequired,
};

export default withRouter(LocationSelection);
