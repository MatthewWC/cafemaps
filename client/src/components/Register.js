import React from 'react'
import validator from 'validator'
import gql from 'graphql-tag'
import Page from './Page'

// ---- material-ui imports ----
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
// -----------------------------

// material-ui styles
const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(1),
    width: '100%'
  },
  fields: {
    margin: theme.spacing(1),
    width: '97%'
  },
  button: {

  },
  errors: {
    margin: theme.spacing(1)
  }

}))

function Register (props) {
  let form
  let status

  // styles instance
  const classes = useStyles()

  // on button click
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
              mutation register($email: String!, $firstName: String!, $password: String!){
                register(email: $email, firstName: $firstName, password: $password){
                  email
                }
              }`,
            variables: {
              email: form.email.value,
              firstName: form.firstName.value,
              password: form.password.value
            }
          })
      // successful response
      props.history.push('/login')
      } catch (err) {
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
    // check passwords
    if(validator.isEmpty(form.password.value) === true){
      errorText.innerHTML = 'Password cannot be empty.'
    }
    if(form.password.value !== form.confirmPassword.value){
      errorText.innerHTML = 'Passwords do not match.'
    }
    // check firstname
    if(validator.isByteLength(form.firstName.value, { min: 2 }) === false){
      errorText.innerHTML = 'First Name must be atleast two characters.'
    }
    else return 'valid'
  }


  return (
    <Page>
      <Container maxWidth='sm'>
        <h1>Register Page</h1>
        <form
          className={classes.form}
        >
          <TextField
            className={classes.fields}
            name='email'
            margin='normal'
            variant='outlined'
            label='Email'
            InputLabelProps={{
              shrink: true,
            }}
            type='text'
          />
          <TextField
            className={classes.fields}
            name='firstName'
            margin='normal'
            variant='outlined'
            label='First Name'
            InputLabelProps={{
              shrink: true,
            }}
            type='text'
          />
          <TextField
            className={classes.fields}
            name='password'
            margin='normal'
            variant='outlined'
            label='Password'
            InputLabelProps={{
              shrink: true,
            }}
            type='text'
          />
          <TextField
            className={classes.fields}
            name='confirmPassword'
            margin='normal'
            variant='outlined'
            label='Confirm Password'
            InputLabelProps={{
              shrink: true,
            }}
            type='text'
          />
          <FormHelperText
            className={classes.errors}
            id='errorText'
            error={true}
          >
          </FormHelperText>
          <Button
            className={classes.button}
            variant='contained'
            onClick={() => {
              onSubmit(props)
            }}
          >
            REGISTER
          </Button>
        </form>
      </Container>
    </Page>
  )
}

export default Register