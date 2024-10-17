import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => Router.push('/orders'),
  });


  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);  

  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }

  return <div>
    Time left to pay: {timeLeft} seconds
    <StripeCheckout
      token={({ id }) => doRequest({ token: id })}
      stripeKey="pk_test_51QA4kwGUrpRj45b5d66OO0uqrLSIHb05NUKiGwvyKa47pCPyJPnkHit2vr1wq6oBZLqdFP6FwMPCXO94BbV3dFt400XJhXQBGb"
      amount={order.ticket.price * 100}
      email={currentUser.email}
    />
    </div>;
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
