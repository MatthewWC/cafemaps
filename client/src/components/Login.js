import React from 'react'
import gql from 'graphql-tag'
import validate from '../tools/validator'
// ---- material-ui imports ----
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
// -----------------------------

// material ui styles
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',

  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  fields: {
    margin: theme.spacing(1),
    width: '97%'
  },
  errors: {
    margin: theme.spacing(1)
  }
}))

function Login (props){
  let loginForm = React.createRef()
  let errorText = React.createRef()

  // styles instance
  const classes = useStyles()

  // when button clicked
  async function handleSubmit(event, props){
    event.preventDefault()

    // check for client errors & run mutation if none
    try{
      await validate(loginForm)
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
    props.history.push('/')
    } 
    catch(err){
      let errMsg
      // handle unsuccessful response
      errMsg = err.toString().lastIndexOf(':') + 1
      errorText.current.innerHTML = err.toString().substring(errMsg, 75)
    }
  }

  return(
      <Container 
        className={classes.root}
        maxWidth='sm'>
        <h1>Login Page</h1>
        <form 
          ref={loginForm}
          onSubmit={(event) => {
            handleSubmit(event, props)
          }}
          className={classes.form}>
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
            variant='contained'
            type='submit'>
            LOGIN
          </Button>
        </form>
      </Container>
  )
}

export default Login