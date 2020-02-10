import React from 'react'

import FeaturesButton from './FeaturesButton'
import CoffeeBeanIcon from './Icons/CoffeeBeanIcon'
import WifiIcon from './Icons/WifiIcon'
import IndoorSeatingIcon from './Icons/IndoorSeatingIcon'
import VeganLeafIcon from './Icons/VeganLeafIcon'
import DriveThruIcon from './Icons/DriveThruIcon'
import BakeryIcon from './Icons/BakeryIcon'

// ----  M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
// ----  M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  featuresRoot: {
    marginTop: 5,
    marginBottom: 5,
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  iconContainer: {
    marginBottom: 5,
    backgroundColor: '#B36D17',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  icon: {
    height: '20px',
    width: '20px',
    margin: 5,
    color: '#54C6FF'// #CECECE for grey
  }
}))

function Features () {
  // M-UI styles instance
  const classes = useStyles()

  return (
      <Grid container className={classes.featuresRoot} direction='column' alignItems='center'>
        <FeaturesButton/>
        <Paper className={classes.iconContainer}>
          <CoffeeBeanIcon className={classes.icon} viewBox={'0 0 326.05 326.05'}/>
          <WifiIcon className={classes.icon} viewBox={'0 0 493.746 493.746'}/>
          <IndoorSeatingIcon className={classes.icon} viewBox={'0 0 209.268 209.268'}/>
          <VeganLeafIcon className={classes.icon} viewBox={'0 0 469.333 469.333'}/>
          <DriveThruIcon className={classes.icon} viewBox={'0 0 447.645 447.645'}/>
          <BakeryIcon className={classes.icon} viewBox={'0 0 511.999 511.999'}/>
        </Paper>
      </Grid>
  )
}

export default Features