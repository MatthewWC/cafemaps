import React from 'react'
import gql from 'graphql-tag'
import validate from '../tools/validator'

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
  let registerForm = React.createRef()
  let errorText = React.createRef()

  // styles instance
  const classes = useStyles()

  // on button click
  async function handleSubmit(event, props){
    event.preventDefault()

    // check for client error & run mutation if none
      try{
        await validate(registerForm)
        const results = await props.client
          .mutate({
            mutation: gql`
              mutation register($email: String!, $firstName: String!, $password: String!){
                register(email: $email, firstName: $firstName, password: $password){
                  email
                }
              }`,
            variables: {
              email: registerForm.current.email.value,
              firstName: registerForm.current.firstName.value,
              password: registerForm.current.password.value
            }
          })
      // successful response
      console.log(results)
      props.history.push('/login')
      } catch (err) {
        let errMsg
        // handle unsuccessful response
        errMsg = err.toString().lastIndexOf(':') + 1
        errorText.current.innerHTML = err.toString().substring(errMsg, 50)
      }
  }

  return (
      <Container maxWidth='sm'>
        <h1>Register Page</h1>
        <form
          ref={registerForm}
          onSubmit={(event) => {
            handleSubmit(event, props)
          }}
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
            ref={errorText}
            error={true}
          >
          </FormHelperText>
          <Button
            className={classes.button}
            variant='contained'
            type='submit'
          >
            REGISTER
          </Button>
        </form>
      </Container>
  )
}

export default Register