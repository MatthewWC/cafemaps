import React from 'react'

import Features from './Features'
import Hours from './Hours'
import Address from './Address'

// ---- M-UI imports
import { makeStyles } from '@material-ui/core/styles'
//import Rating from '@material-ui/lab/Rating'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
// ---- M-UI imports

// M-UI styles
const useStyles = makeStyles(theme => ({
  storeInfoRoot: {
    marginTop: 10,
    padding: 10,
    overflowY: 'scroll',
    backgroundColor: '#CECECE',
    maxHeight: '80%'
  },
  topGrid: {
    marginTop: 5,
    marginBottom: 5,
  },
  title: {
    width: '100%',
    padding: '5px',
    textAlign: 'center',
    overflowX: 'hidden',
    wordWrap: 'break-word',
    marginBottom: 5,
    marginTop: 5
  },
  addressWrapper: {
    backgroundColor: '#FFB354',
    textAlign: 'center',
    padding: 5
  },
  address: {
    textAlign: 'center'
  },
  imageContainer: {
    margin: 'auto',
    width: '150px',
    height: '150px'
  }
}))

//TODO: add contribute to icon images 
function StoreInfo ({ storeInfo }) {
  // M-UI styles instance
  const classes = useStyles()
  console.log(storeInfo)
  if(storeInfo){
    return (
      <Grid container className={classes.storeInfoRoot}>
        <Avatar 
          className={classes.imageContainer} 
          src={storeInfo.imageUrl || ''} 
          alt='store'/>
        <Typography 
          className={classes.title} 
          variant='h4'>{storeInfo.storeName}
        </Typography>
        <Grid container
          className={classes.topGrid} 
          wrap='nowrap' 
          justify='space-between' 
          direction='column' 
        >
        <Features 
          wifi={storeInfo.wifi} 
          bakery={storeInfo.bakery} 
          milkAlt={storeInfo.milkAlt} 
          indoorSeating={storeInfo.indoorSeating} 
          driveThru={storeInfo.driveThru}
          roastery={storeInfo.roastery}/>
        <Address 
          addressOne={storeInfo.addressOne} 
          addressTwo={storeInfo.addressTwo} 
          city={storeInfo.city}
          state={storeInfo.state} 
          zipcode={storeInfo.zipcode}/>
        <Hours
          moHours={storeInfo.moHours}
          tuHours={storeInfo.tuHours}
          weHours={storeInfo.weHours}
          thHours={storeInfo.thHours}
          frHours={storeInfo.frHours}
          saHours={storeInfo.saHours}
          suHours={storeInfo.suHours}
        />
        </Grid>
      </Grid>
    )
  }
  else{
    //TODO: ellaborate 
    return(
      <div></div>
    )
  }
}
// <Rating value={5} readOnly/>
export default StoreInfo