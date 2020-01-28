import React from 'react'

import GeoLocationButton from './GeoLocationButton'
import SearchInput from './SearchInput'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  searchBarRoot: {
    margin: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: 10,
    margin: 5,
  }
}))

function SearchBar () {
  // M-UI styles instance
  const classes = useStyles()

  return (
    <Paper elevation={3} className={classes.searchBarRoot}>
      <GeoLocationButton/>
      <SearchInput/>
    </Paper>
  )
}

export default SearchBar