import React from 'react'

// ---- M-UI imports ----
import IconButton from '@material-ui/core/IconButton'
import HelpIcon from '@material-ui/icons/Help'
import Popper from '@material-ui/core/Popper'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import WifiIcon from '@material-ui/icons/Wifi'
import WeekendIcon from '@material-ui/icons/Weekend'
// ---- M-UI imports ----

// M-UI styles
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    maxWidth: '200px',
    minWidth: '200px'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1)
  },
  key: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  icon: {
    float: 'right'
  }
}))

function FeaturesButton () {
  // M-UI styles instance 
  const classes = useStyles()
  // M-UI features anchor
  const [anchorEl, setAnchorEl] = React.useState(null)
  // position for popup
  const [placement, setPlacement] = React.useState()
  // toggle for open or close
  const [open, setOpen] = React.useState(false);

  // handle features button clicked
  const handleClick = newPlacement => event => {
    // set anchor to current element clicked
    setAnchorEl(anchorEl ? null : event.currentTarget)
    // set state of popup, and position
    setOpen(prev => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }

  return(
    <div>
      <IconButton onClick={handleClick('left')}>
        <HelpIcon/>
      </IconButton>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition disablePortal>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper className={classes.paper}>
              <Typography className={classes.title}>Store Features Tooltip</Typography>
              <Typography>
                Bold Icon: Available
              </Typography>
              <Typography>
                Grey Icon: Unavailable
              </Typography>
              <Typography className={classes.key}>Key</Typography>
              <Typography 
                className={classes.iconText}>
                  Wifi <WifiIcon fontSize='small' className={classes.icon}/>
              </Typography>
              <Typography 
                className={classes.iconText}>
                  Indoor Seatting <WeekendIcon fontSize='small' className={classes.icon}/>
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  )
}

export default FeaturesButton