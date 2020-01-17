import validator from 'validator'

const validate = (form) => {
  let formFields = form.current
  switch(formFields.name){
    case 'updateUserForm':
      // check for random character if field isnt empty
      Object.keys(formFields).forEach(function (item){
        if(formFields[item].type === 'text' && formFields[item].value !== ''){
          if(validator.isAlphanumeric(formFields[item].value) === false){
            throw new Error('Fields can only contain letters A-Z & numbers 0-9.')
          }
        }
      })
      break
    case 'loginForm':
      // check for empty fields on email & password
      if(validator.isEmpty(form.current[0].value) || validator.isEmpty(form.current[2].value)){
        throw new Error('Fields cannot be empty.')
      }
      // check if email is valid
      if(validator.isEmail(form.current[0].value) === false){
        throw new Error('Thats not a real email.')
      }
      break
    case 'registerForm':
      // check for empty fields
      Object.keys(formFields).forEach(function (item){
        if(formFields[item].type === 'text'){
          if(validator.isEmpty(formFields[item].value)){
            throw new Error('Fields cannot be empty.')
          }
        }
      })
      // check if email is valid
      if(validator.isEmail(form.current[0].value) === false){
        throw new Error('Thats not a real email.')
      }
      // compare password & confirm password
      if(form.current[2].value !== form.current[4].value){
        throw new Error('Passwords do not match.')
      }
      break
    default:
      // if user somehow changed form name
      throw new Error('Something bad happened. Contact support.') 
  }
}

export default validate