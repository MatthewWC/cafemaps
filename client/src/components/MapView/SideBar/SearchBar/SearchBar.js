import React from 'react'

import GeoLocationButton from './GeoLocationButton'
import SearchInput from './SearchInput'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  searchBarRoot: {
    backgroundColor: '#CECECE',
    padding: 5
  }
}))

function SearchBar (props) {
  // M-UI styles instance
  const classes = useStyles()

  return (
    <Grid container wrap='nowrap' className={classes.searchBarRoot} >
      <GeoLocationButton geolocationFunction={props.geolocationFunction}/>
      <SearchInput/>
    </Grid>
  )
}

export default SearchBar