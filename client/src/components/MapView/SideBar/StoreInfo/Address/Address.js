import React from 'react'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  addressRoot: {
    textAlign: 'center'
  },
  header: {
    //TODO: underline
  },
  address: {

  }
}))

function Address ({ addressOne, addressTwo, city, state, zipcode }) {
  // M-UI styles instance
  const classes = useStyles()

  return (
    <Grid  className={classes.addressRoot} container direction='column' >
      <Typography className={classes.header}>Address</Typography>
      <Typography className={classes.address}>{`${addressOne}, ${addressTwo} ${city} ${state}, ${zipcode}`}</Typography>
    </Grid>
  )
}

export default Address