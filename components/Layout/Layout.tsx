import { ReactNode, FC, useState, useEffect } from 'react';

import Head from 'next/head';
import { useDispatch } from 'react-redux';

import Header from './header';
import ModalForm from './Modal-form';
import { setAccessKey } from '../../store/slices/sessionSlice';

interface IProps {
  children: ReactNode;
}

const RootLayout: FC<IProps> = ({ children }) => {
  const [openFormSignInModal, setOpenFormSignInModal] = useState(false);
  const dispatch = useDispatch();
  const handleOpenSignInModal = () => {
    setOpenFormSignInModal(true);
  };
  const handleCloseSignInModal = () => {
    setOpenFormSignInModal(false);
  };

  useEffect(() => {
    const updateKeysFromLocalStorage = () => {
      const storedSession = localStorage.getItem('session');

      if (storedSession) {
        try {
          const sessionData = JSON.parse(storedSession);
          const { refresh, access } = sessionData;

          dispatch(setAccessKey(access));
        } catch (error) {
          console.error('Error parsing session data:', error);
        }
      } else {
        dispatch(setAccessKey(null));
      }
    };

    updateKeysFromLocalStorage();

    window.addEventListener('storage', updateKeysFromLocalStorage);

    return () => {
      window.removeEventListener('storage', updateKeysFromLocalStorage);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Lintu - main page</title>
        <meta name="description" content={'Page of Lintu progect'} />
        <meta name="keywords" content={'Lintu, investments, finance, shares'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header handleOpenSignInModal={handleOpenSignInModal} />

      {children}

      <footer></footer>

      <ModalForm
        handleCloseSignInModal={handleCloseSignInModal}
        openFormSignInModal={openFormSignInModal}
      />
    </>
  );
};

export default RootLayout;
