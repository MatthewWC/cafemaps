import React from 'react'

import gql from 'graphql-tag'

import validate from '../tools/validator'

// ---- M-UI imports ----
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'
import Link from "@material-ui/core/Link"
import Divider from '@material-ui/core/Divider'
// ---- M-UI imports ----

//TODO: add google sigin in
//TODO: forgot password page & link
//TODO: fix graphql error handling on query/mutation return

// M-UI styles
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '90vh',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1024px',
    padding: '5%'
  },
  login: {
    textAlign: 'center',
    margin: 'auto',
    width: '100%',
    maxWidth: '300px'
  },
  title: {

  },
  button: {
    width: '100%'
  },
  fields : {
    width: '100%'
  },
  errors: {
    margin: theme.spacing(2)
  },
  divider: {
    marginTop: theme.spacing(5)
  },
  registerText: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    
  }
}))

function Login (props){
  // M-UI styles instance
  const classes = useStyles()

  // refs
  let loginForm = React.createRef()
  let errorText = React.createRef()

  // when button clicked
  async function handleSubmit(event, props){
    event.preventDefault()

    // check for client errors & run mutation if none
    try{
      validate(loginForm)
      const results = await props.client
        .mutate({
          mutation: gql`
            mutation login($email: String!, $password: String!){
              login(email: $email, password: $password){
                user{
                  email
                }
                token
              }
            }`,
          variables: {
            email: loginForm.current.email.value,
            password: loginForm.current.password.value
          }
        })
    // successful response
    await localStorage.setItem('token', results.data.login.token)
    await localStorage.setItem('email', results.data.login.user.email)
    props.history.push('/')
    } 
    catch(err){
      console.log(err)
      let errMsg
      // handle unsuccessful response
      errMsg = err.toString().lastIndexOf(':') + 1
      errorText.current.innerHTML = err.toString().substring(errMsg, 75)
    }
  }

  return(
    <div className={classes.root}>
      <div className={classes.login}>
      <form        
        name='loginForm'  
        ref={loginForm}
        onSubmit={(event) => {
          handleSubmit(event, props)
        }}>
        <Typography
          variant='h4'>
          Log in
        </Typography>
        <Typography
          variant='h6'>
          &
        </Typography>
        <Typography
          variant='h6'>
          Start Mapping!
        </Typography>
        <TextField
          className={classes.fields}
          name='email'
          margin='normal'
          variant='outlined'
          label='Email'
          InputLabelProps={{
            shrink: true,
          }}
          type='text'/>
        <TextField
          className={classes.fields}
          name='password'
          margin='normal'
          variant='outlined'
          label='Password'
          InputLabelProps={{
            shrink: true,
          }}
          type='text'/>
        <FormHelperText
          className={classes.errors}
          ref={errorText}
          error={true}>
        </FormHelperText>
        <Button
          className={classes.button}
          variant='contained'
          type='submit'>
          LOGIN
        </Button>
      </form>
      <Divider className={classes.divider}/>
        <div className={classes.registerText}>
          <Typography> 
            New around here?...
            <Link
              href={'/register'}>
              Register.
            </Link>
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default Login