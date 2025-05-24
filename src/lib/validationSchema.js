import * as Yup from 'yup';

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must have at least 8 characters')
    .required('Required'),
});