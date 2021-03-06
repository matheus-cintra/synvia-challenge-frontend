import * as Yup from 'yup';

/** *****************************************************************************
 * SignUp Schema
 ****************************************************************************** */
const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Nome muito pequeno.')
    .required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha muito pequena')
    .required('Senha é obrigatório'),
});

const validateSignUp = async function validateSignUp(data) {
  return signUpSchema.validate(data, {
    abortEarly: false,
  });
};
/** *************************************************************************** */

export { validateSignUp };
