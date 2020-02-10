import React from 'react'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
// ---- M-UI imports ----

// M-UI styles 
const useStyles = makeStyles(theme => ({
  hoursRoot: {
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    padding: 5
  },
  hours: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    width: '50%',
  }
}))

function Hours () {
  // M-UI styles instance
  const classes = useStyles()

  // state for expand list
  const [open, setOpen] = React.useState(false);

  // hours of op expand handle
  const handleClick = () => {
    setOpen(!open);
  };

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
    <Grid container direction='column' className={classes.hoursRoot}>
      <Typography>Hours</Typography>
      <ListItem button className={classes.button} onClick={handleClick}>
        <ListItemText primary={'Hours of Operation'}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.hours}>
            {Object.keys(week).map(day => {
              return <ListItem key={day}>{week[day]}</ListItem>
            })}
          </ListItem>
        </List>
      </Collapse>
    </Grid>
  )
}

export default Hours