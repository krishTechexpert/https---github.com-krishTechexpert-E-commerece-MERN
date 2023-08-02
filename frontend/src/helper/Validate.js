import * as Yup from "yup";

const nameValidate = {
    name:Yup.string().required("Required")
    .min(3, 'name is too short - should be 3 chars minimum.')
}

const emailValidate ={
    email:Yup.string().email("Invalid email address").required("Required")
}
const passwordValidate = {
    password: Yup.string()
            .required('No password provided.') 
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
}

const confirmPasswordValidate = {
    confirmPassword: Yup.string()
            .required('No password provided.') 
            .test('passwords-match', 'Passwords must match', function (value) {
                return this.parent.password === value;
            })    
};
 
// Register page
 export const SchemaRegisterValidation = Yup.object().shape({
    ...nameValidate,
    ...emailValidate,
    ...passwordValidate,
    ...confirmPasswordValidate,
   
  })
 
  // Login page
  export const SchemaLoginValidation = Yup.object().shape({
    ...emailValidate,
    ...passwordValidate,
 
  })

  // Update profile Page
  export const SchemaProfileUpdateValidation = Yup.object().shape({
    ...nameValidate,
    ...emailValidate
  })