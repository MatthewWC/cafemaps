import React from 'react'

// ---- material-ui imports ----
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
// -----------------------------


function Register (props) {
  return (
  <Container maxWidth='sm'>
    <h1>Register Page</h1>
    <form>
      <TextField
        name='password'
        margin='normal'
        variant='outlined'
        label='Password'
        InputLabelProps={{
          shrink: true,
        }}
        type='text'
      />
    </form>
  </Container>
  )
}

export default Register