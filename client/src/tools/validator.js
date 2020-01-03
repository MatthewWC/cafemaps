import validator from 'validator'

const validate = (form) => {
  let formFields = form.current
 
  Object.keys(formFields).forEach(function (item){
    
    if(formFields[item].type === 'text'){
      if(validator.isEmpty(formFields[item].value)){
        throw Error('Fields cannot be empty.')
      }
      if(formFields[item].name === 'email' && validator.isEmail(formFields[item].value) === false){
        throw Error('Please use a real email.')
      }
      if(formFields[item].name === 'password' && formFields[item].value !== formFields.confirmPassword.value){
        throw Error('Passwords do not match.')
      }
    }

    
  })
}

export default validate