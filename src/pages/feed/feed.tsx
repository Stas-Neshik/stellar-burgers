import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store/store';
import { getFeedOrders, loadFeed } from '../../services/slices/feed';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const feedOrders = useSelector(getFeedOrders);
  const orders: TOrder[] = feedOrders;

  useEffect(() => {
    dispatch(loadFeed());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(loadFeed());
      }}
    />
  );
};
