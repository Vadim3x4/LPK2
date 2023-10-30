import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';

import {
  ForgotPasswordBoxRestyled,
  ForgotPasswordFormRestyled,
  ForgotPasswordHeadingFormRestyled,
  ForgotPasswordIconButtonRestyled,
  ForgotPasswordInputFieldRestyled,
} from '../sign-in/style-sign-in';
import {
  ButtonRestyled,
  LabelTextRestyled,
} from '../sign-up/style-sign-up-form';
import {
  schemaEmailValidation,
  temperalSignUpSchemaValidation,
} from '../utils/validation/common-validation';

interface Props {
  handleCloseForgotPasswordModal: () => void;
  handleOpenForgotPasswordMessageModal: () => void;
  isMobile: boolean;
}

interface SignUpData {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  country: string;
  phone_number: string;
}

type ForgotPasswordFormTypes = {
  email: string;
  phone: string;
};

// Это временная форма, чтобы можно было преверить работу теста
const TemperalSignUpForm = ({
  handleCloseForgotPasswordModal,
  handleOpenForgotPasswordMessageModal,
  isMobile,
}: Props) => {
  const InputSize = isMobile ? 'small' : 'medium';
  const ButtonSize = isMobile ? 'small' : 'large';
  const { handleSubmit, control } = useForm<ForgotPasswordFormTypes>({
    mode: 'onChange',
    resolver: yupResolver(temperalSignUpSchemaValidation),
  });
  const router = useRouter();

  const { errors, isValid } = useFormState({
    control,
  });

  const signUp = async (userData: SignUpData) => {
    try {
      const response = await axios.post(process.env.BASE_DEV_URL + 'signup/', {
        password: userData.password,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        country: userData.country,
        phone_number: `+${userData.phone_number}`,
      });
      return response;
    } catch (error: any) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<ForgotPasswordFormTypes> = async (data) => {
    if (isValidForm(data)) {
      const stangeButFullData = {
        password: 'Lintu4ever!',
        email: data.email,
        first_name: 'Niklas',
        last_name: 'Koskinen',
        country: 'Finland',
        phone_number: '+7999876' + data.phone,
      };

      const signUpResult = await signUp(stangeButFullData);

      if (signUpResult?.data?.id) {
        handleCloseForgotPasswordModal();
        router.push('/confirm-email');
      }
    } else errors;
  };

  const isValidForm = (data: ForgotPasswordFormTypes) =>
    schemaEmailValidation.isValidSync(data);

  return (
    <ForgotPasswordBoxRestyled>
      <ForgotPasswordFormRestyled>
        <ForgotPasswordHeadingFormRestyled>
          Временная форма регистрации
        </ForgotPasswordHeadingFormRestyled>
        <ForgotPasswordIconButtonRestyled
          aria-label="Close-form"
          onClick={handleCloseForgotPasswordModal}
        >
          <CloseIcon />
        </ForgotPasswordIconButtonRestyled>
      </ForgotPasswordFormRestyled>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <ForgotPasswordInputFieldRestyled
              id="forgot-password-form-email"
              fullWidth
              label="Email"
              size={InputSize}
              variant="outlined"
              error={!!fieldState.error?.message}
              helperText={fieldState.error?.message}
              value={field.value || ''}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field, fieldState }) => (
            <ForgotPasswordInputFieldRestyled
              id="forgot-password-form-phone"
              fullWidth
              label="4 последние цифры телефона"
              size={InputSize}
              variant="outlined"
              error={!!fieldState.error?.message}
              helperText={fieldState.error?.message}
              value={field.value || ''}
              onChange={field.onChange}
            />
          )}
        />

        <h3 style={{ color: 'tomato' }}>Пароль: Lintu4ever!</h3>

        <ButtonRestyled
          type="submit"
          id="forgot-password-form-button"
          variant="contained"
          fullWidth
          size={ButtonSize}
          color="primary"
        >
          Send email
        </ButtonRestyled>
      </Box>
    </ForgotPasswordBoxRestyled>
  );
};
export default TemperalSignUpForm;
