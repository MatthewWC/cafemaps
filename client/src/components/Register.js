import React from 'react'
import gql from 'graphql-tag'
import validate from '../tools/validator'

// ---- M-UI imports ----
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'
// ---- M-UI imports ----

//TODO: research privacy policy/accept terms
//TODO: captcha? spam prevent
//TODO: add successful registration display

// M-UI styles
const useStyles = makeStyles(theme => ({
  form: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    maxWidth: '400px'
  },
  fields: {
  },
  button: {

  },
  errors: {
    margin: theme.spacing(2)
  }
}))

function Register (props) {
  let registerForm = React.createRef()
  let errorText = React.createRef()
  
  // M-UI styles instance
  const classes = useStyles()

  // when button click
  async function handleSubmit(event, props){
    event.preventDefault()

    // check for client error & run mutation if none
    try{
      validate(registerForm)
      const results = await props.client
        .mutate({
          mutation: gql`
            mutation register($email: String!, $password: String!){
              register(email: $email, password: $password){
                email
              }
            }`,
          variables: {
            email: registerForm.current.email.value,
            password: registerForm.current.password.value
          }
        })
      // successful response
      console.log(results)
      props.history.push('/login')
    } catch (error) {
      let errMsg
      // handle unsuccessful response
      errMsg = error.toString().lastIndexOf(':') + 1
      errorText.current.innerHTML = error.toString().substring(errMsg, 75)
    }
  }

  return (
    <form
      name='registerForm'
      className={classes.form}
      ref={registerForm}
      onSubmit={(event) => {
        handleSubmit(event, props)
      }}
    >
      <Typography>
        Register
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
  )
}

export default Register