import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store/store';
import { Preloader } from '@ui';
import {
  getOrders,
  getOrdersRequest,
  loadingUsers
} from '../../services/slices/orders';
import { UserData } from '../../services/slices/user';

export const ProfileOrders: FC = () => {
  const isLoading = useSelector(getOrdersRequest);
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getOrders);
  const user = useSelector(UserData);

  useEffect(() => {
    if (user) dispatch(loadingUsers());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
