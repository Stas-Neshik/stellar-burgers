import { Preloader } from '@ui';
import { AppDispatch, useSelector } from '../../services/store/store';
import { Navigate, useLocation } from 'react-router';
import { getUser, UserChecked, UserData } from '../../services/slices/user';
import { getCookie } from '../../utils/cookie';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(UserChecked);
  const user = useSelector(UserData);
  const location = useLocation();

  console.log(isAuthChecked, user);

  // if (!isAuthChecked) {
  //   return <Preloader />;
  // }

  // if (onlyUnAuth && !user) {
  //   return <Navigate replace to='/login' state={{ from: location }} />;
  // }

  // if (onlyUnAuth && user) {
  //   const from = location.state?.from || { pathname: '/' };

  //   return <Navigate replace to={from} />;
  // }

  return children;
};
