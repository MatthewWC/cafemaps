import React from 'react'
// ---- material-ui imports ----
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
// -----------------------------

function UserMenu () {

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
  }

  return ( 
    <div>
      <Button 
        aria-controls="simple-menu" 
        aria-haspopup="true"
        onClick={handleClick}
      >
      USER
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={() => {
          handleLogout()}}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default UserMenu