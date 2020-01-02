import React from 'react'

// ---- material-ui imports ----
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
// -----------------------------

import Page from './Page'
import gql from 'graphql-tag'
import validator from 'validator'

// material ui styles
const useStyles = makeStyles(theme => ({
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
  let form
  let status

  // styles instance
  const classes = useStyles()

  // when button clicked
  async function onSubmit(props){
    form = await document.querySelector('form')
    
    // handle client errors
    status = await validate(form)
      
      // if successful hit server
      if(status === 'valid'){
        try{
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
                email: form.email.value,
                password: form.password.value
              }
            })
        // successful response
        await localStorage.setItem('token', results.data.login.token)
        props.history.push('/')
      } catch(err){
        // handle unsuccessful response
        let errorText = document.getElementById('errorText')
        errorText.innerHTML = err.toString().slice(22)
      }
    }
  }

  // handle client errors
  async function validate(form){
    let errorText = document.getElementById('errorText')
    errorText.innerHTML = ''

    // check email format
    if(validator.isEmail(form.email.value) === false){
      errorText.innerHTML = 'Please enter a real email.'
    }
    // check empty fields
    if(validator.isEmpty(form.password.value) === true){
      errorText.innerHTML = 'Fields cannot be empty.'
    }
    else return 'valid'
  }

  return(
    <Page>
      <Container maxWidth='sm'>
        <h1>Login Page</h1>
        <form 
          name='form'
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
            id='errorText'
            error={true}>
          </FormHelperText>
          <Button
            variant='contained'
            onClick={() => {
              onSubmit(props)
            }}>
            LOGIN
          </Button>
        </form>
      </Container>
    </Page>
  )
}

export default Login