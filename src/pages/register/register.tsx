import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store/store';
import {
  RegisterError,
  registerUser,
  RequestLoginUser
} from '../../services/slices/user';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const errorText = useSelector(RegisterError) || undefined;
  const request = useSelector(RequestLoginUser);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, name: userName, password }));
  };

  return (
    <>
      {request ? (
        <Preloader />
      ) : (
        <RegisterUI
          errorText={errorText}
          email={email}
          userName={userName}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          setUserName={setUserName}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
