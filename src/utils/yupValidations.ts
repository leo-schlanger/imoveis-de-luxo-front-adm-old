import * as Yup from 'yup';

export const schemaSignIn = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().min(6, 'No mínimo 6 dígitos'),
});

export const schemaCreateAdvertisement = Yup.object().shape({
  title: Yup.string().required('Titulo obrigatório'),
  description: Yup.string(),
  type: Yup.string().required('Tipo de anuncio obrigatório'),
  type_property: Yup.string().required('Titulo de propriedade obrigatório'),
  // address_visible: Yup.boolean().required('Endereço obrigatório'),
  value: Yup.number().required('Valor obrigatório'),
  country: Yup.string().required('Pais obrigatório'),
  state: Yup.string().required('Estado obrigatório'),
  postal_code: Yup.string().required('Código postal obrigatório'),
  neighborhood: Yup.string().required('Bairro obrigatório'),
  address: Yup.string().required('Endereço obrigatório'),
  number: Yup.string(),
  complement: Yup.string(),
});
