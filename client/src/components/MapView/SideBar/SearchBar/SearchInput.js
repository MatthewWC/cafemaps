import React from 'react'

// ---- M-UI imports ----
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  inputField: {
    marginLeft: '10px',
    width: '100%',
  }
}))

function SearchInput () {
  // M-UI styles instance
  const classes = useStyles()

  return (
    <TextField 
      className={classes.inputField}
      variant='outlined'
      type='text'
      defaultValue='Search...'
      />
  )
}

export default SearchInput
