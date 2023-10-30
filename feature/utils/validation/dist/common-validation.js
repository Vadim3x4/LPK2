'use strict';
exports.__esModule = true;
exports.signInSchema =
  exports.changePasswordSchema =
  exports.signAppSchema =
  exports.schemaRepeatPasswordValidation =
  exports.schemaPasswordValidation =
  exports.schemaEmailValidation =
  exports.REG_PASSWORD =
  exports.REG_EMAIL =
    void 0;
var yup = require('yup');
exports.REG_EMAIL =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
exports.REG_PASSWORD =
  /^.*((?=.*[!@#$%^&*\:]))(?=.*\d)((?=.*[a-z]))((?=.*[A-Z])).*$/;
var ERROR_MESSAGE_INPUT_PASSWORD_FIELD = 'Input your password';
var ERROR_MESSAGE_PASSWORD_FIELD = 'Password must be more then 8 characters';
exports.schemaEmailValidation = yup.object().shape({
  email: yup
    .string()
    .matches(exports.REG_EMAIL, 'Invalid email')
    .required('Input your email'),
});
exports.schemaPasswordValidation = yup.object().shape({
  password: yup
    .string()
    .matches(exports.REG_PASSWORD, ' ')
    .min(8, ERROR_MESSAGE_PASSWORD_FIELD)
    .required(ERROR_MESSAGE_INPUT_PASSWORD_FIELD),
});
exports.schemaRepeatPasswordValidation = yup.object().shape({
  repeatPassword: yup
    .string()
    .min(8, ERROR_MESSAGE_PASSWORD_FIELD)
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(ERROR_MESSAGE_INPUT_PASSWORD_FIELD),
});
exports.signAppSchema = yup
  .object()
  .shape({
    first_name: yup
      .string()
      .required('Input your name')
      .matches(/^([^0-9]*)$/, 'Name should not contain numbers')
      .min(2, 'Name must be more then 2 characters')
      .max(50, 'Name must be more then 50 characters'),
    last_name: yup
      .string()
      .required('Input your last name')
      .matches(/^([^0-9]*)$/, 'Last Name should not contain numbers')
      .min(2, 'Last name must be more then 2 characters')
      .max(50, 'Last name must be less than 50 characters'),
    phone_number: yup.string().required('Input your number'),
    isAccepted: yup
      .bool()
      .required('You need to agree with the terms&conditions')
      .oneOf([true], 'You need to agree with the terms&conditions'),
  })
  .concat(exports.schemaEmailValidation)
  .concat(exports.schemaPasswordValidation)
  .concat(exports.schemaRepeatPasswordValidation);
exports.changePasswordSchema = exports.schemaPasswordValidation.concat(
  exports.schemaRepeatPasswordValidation,
);
exports.signInSchema = exports.schemaEmailValidation.concat(
  exports.schemaPasswordValidation,
);
