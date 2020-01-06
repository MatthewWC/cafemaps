import React from 'react'
import { Link } from 'react-router-dom'
// ---- material-ui imports ----
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
// -----------------------------

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'brown',
    padding: '10px'
  },
  menu: {

  },
  menuButton: {
    
  },
  title: {
    
  }
}))

function Header () {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()

  // open menu 
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  // close menu
  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <Typography variant='h6' className={classes.title}>
        Coffee Maps
      </Typography>
      <IconButton
        className={classes.menuButton}
        onClick={handleClick}>
        <AccountCircleIcon fontSize='large'/>
      </IconButton>
      <Menu
        className={classes.menu}
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        {localStorage.getItem('token') ? 
          (<MenuItem 
            onClick={() => {
              localStorage.removeItem('token')
              handleClose()
            }}
            component={Link}
            to='/login'
          >Logout</MenuItem>) : 
          (<MenuItem 
            onClick={() => {
              handleClose()
            }}
            component={Link}
            to='/login'
          >Login</MenuItem>)
        }
      </Menu>
    </div>
  )
}

export default Header