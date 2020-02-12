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
  iconTrue: {
    height: '20px',
    width: '20px',
    margin: 5,
    color: '#54C6FF' // blue
  },
  iconFalse: {
    height: '20px',
    width: '20px',
    margin: 5,
    color: '#CECECE' // grey
  }
}))

function Features ({wifi, bakery, milkAlt, indoorSeating, driveThru, roastery}) {
  // M-UI styles instance
  const classes = useStyles()

  return (
      <Grid container className={classes.featuresRoot} direction='column' alignItems='center'>
        <FeaturesButton/>
        <Paper className={classes.iconContainer}>
          <WifiIcon className={wifi ? classes.iconTrue: classes.iconFalse} viewBox={'0 0 493.746 493.746'}/>
          <BakeryIcon className={bakery ? classes.iconTrue: classes.iconFalse} viewBox={'0 0 511.999 511.999'}/>
          <VeganLeafIcon className={milkAlt ? classes.iconTrue: classes.iconFalse} viewBox={'0 0 469.333 469.333'}/>
          <IndoorSeatingIcon className={indoorSeating ? classes.iconTrue: classes.iconFalse} viewBox={'0 0 209.268 209.268'}/>
          <DriveThruIcon className={driveThru ? classes.iconTrue: classes.iconFalse} viewBox={'0 0 447.645 447.645'}/>
          <CoffeeBeanIcon className={roastery ? classes.iconTrue: classes.iconFalse} viewBox={'0 0 326.05 326.05'}/>
        </Paper>
      </Grid>
  )
}

export default Features