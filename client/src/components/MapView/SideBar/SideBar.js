import React from 'react'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
// ---- M-UI imports ----

import SearchBar from './SearchBar/SearchBar'
import StoreInfo from './StoreInfo'

// M-UI styles 
const useStyles = makeStyles(theme => ({
  sideBar: {
    width: '500px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 999,
    maxHeight: '95%'
  }
}))
// adjust maxHeight ^ for storinfo fitting page

function SideBar () {
  // M-UI styles instance
  const classes = useStyles()

  return (
    <div className={classes.sideBar}>
      <SearchBar/>
      <StoreInfo/>
    </div>
  )
}

export default SideBar