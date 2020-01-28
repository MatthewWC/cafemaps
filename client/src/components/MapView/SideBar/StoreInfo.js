import React from 'react'
import FeaturesButton from './FeaturesButton'
// ---- M-UI imports
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Rating from '@material-ui/lab/Rating'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { TextField, Typography } from '@material-ui/core'
import WifiIcon from '@material-ui/icons/Wifi'
import WeekendIcon from '@material-ui/icons/Weekend'
// ---- M-UI imports

// M-UI styles
const useStyles = makeStyles(theme => ({
  storeInfoRoot: {
    margin: theme.spacing(2),
    backgroundColor: 'white',
    padding: '10px',
    margin: 5,
    overflowY: 'scroll',
  },
  hours: {
    display: 'flex',
    flexDirection: 'column'
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
  },
  topLeftPaper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
    marginRight: '10px',
  },
  topRightPaper: {
    padding: '5px',
    textAlign: 'center',
    width: '100%',
    overflowX: 'hidden',
    wordWrap: 'break-word'
  },
  icon: {
    color: '#ECECEC'
  },
}))

function StoreInfo () {
  // M-UI styles instance
  const classes = useStyles()

  // state for expand list
  const [open, setOpen] = React.useState(false);

  // hours of op expand handle
  const handleClick = () => {
    setOpen(!open);
  };

  let wifiStatus = false

  // temporary Hours of Op Array
  const week = {
    1: 'Mon: 7am-7pm',
    2: 'Tue: 7am-7pm',
    3: 'Wed: 7am-7pm',
    4: 'Thu: 7am-7pm',
    5: 'Fri: 7am-7pm',
    6: 'Sat: 8am-3pm',
    7: 'Sun: CLOSED'
  } 

  return (
    <Paper 
      elevation={3}
      className={classes.storeInfoRoot}
    >
      <div className={classes.top}>
      <Paper className={classes.topLeftPaper}>
      <img src='profile_basic.png' alt='store' width='100px' height='100px'/>
      <Rating value={5} readOnly/>
      </Paper>
      <Paper className={classes.topRightPaper}>
        <Typography variant='h4'>Because Coffee</Typography>
      </Paper>
      </div>
      <Paper>
        <h3>240 Dawson Village Way N Suite #100, Dawsonville, GA 30534</h3>
      </Paper>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={'Hours of Operation'}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem text className={classes.hours}>
            {Object.keys(week).map(day => {
              return <ListItem key={day}>{week[day]}</ListItem>
            })}
          </ListItem>
        </List>
      </Collapse>

      <Typography className={classes.headers}>Store Features:</Typography>
      <FeaturesButton/>
      { wifiStatus ?
        <WifiIcon/> :
        <WifiIcon className={classes.icon}/>
      } 
      <WeekendIcon/>
      <Typography className={classes.headers}>Store Description:</Typography>
      <Typography className={classes.description}>A local coffee shop, that focuses on in house roasting.</Typography>
    </Paper>
  )
}

export default StoreInfo