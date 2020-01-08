import React from 'react'
import gql from 'graphql-tag'
import validate from '../tools/validator'

// ---- material-ui imports ----
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'
// -----------------------------

//TODO: research privacy policy/accept terms
//TODO: captcha? spam prevent

// material-ui styles
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
  
  // styles instance
  const classes = useStyles()

  // when button click
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
      errorText.current.innerHTML = err.toString().substring(errMsg, 75)
    }
  }

  return (
    <form
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
  )
}

export default Register