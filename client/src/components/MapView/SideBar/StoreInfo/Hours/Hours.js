import React from 'react'

// ---- M-UI imports ----
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Table from '@material-ui/core/Table/'
import TableContainer from '@material-ui/core/TableContainer'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
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
  }
}))

function Hours ({moHours, tuHours, weHours, thHours, frHours, saHours, suHours}) {
  // M-UI styles instance
  const classes = useStyles()

  // state for expand list
  const [open, setOpen] = React.useState(false);

  // hours of op expand handle
  const handleClick = () => {
    setOpen(!open);
  };

  function createRow(key, day, hours){
    return { key, day, hours }
  }

  const rows = [
    createRow(1, 'Monday', moHours),
    createRow(2, 'Tuesday', tuHours),
    createRow(3, 'Wednesday', weHours),
    createRow(4, 'Thursday', thHours),
    createRow(5, 'Friday', frHours),
    createRow(6, 'Saturday', saHours),
    createRow(7, 'Sunday', suHours)
  ]

  // header for hours drop down
  function getTodaysDate(){
    let today
    const todaysDate = new Date()
    rows.map(row => {
      if(row.key === todaysDate.getDay()){
        today = `${row.day}: ${row.hours}`
        return today
      }
      return today
    })
    return today
  }
  console.log(getTodaysDate())
  return (
    <Grid container direction='column' className={classes.hoursRoot}>
      <Typography>Hours</Typography>
      <ListItem button className={classes.button} onClick={handleClick}>
        <ListItemText primary={getTodaysDate()}/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <TableContainer>
          <Table>
            <TableBody>
              {
                rows.map(row => (
                  <TableRow key={row.day}>
                    <TableCell>
                      {row.day}
                    </TableCell>
                    <TableCell>
                      {row.hours}
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Grid>
  )
}

export default Hours