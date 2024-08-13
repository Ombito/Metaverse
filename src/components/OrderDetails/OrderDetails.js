import React from 'react';
import { useParams } from 'react-router-dom';

const OrderDetails = ({ user }) => {
  const { orderId } = useParams();

  // Find the order details based on the orderId
  const orderDetails = user.orders.find(order => order.id === parseInt(orderId));

  if (!orderDetails) {
    return <div>Order not found</div>;
  }

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>
      <div>
        <h3>Order #{orderDetails.id}</h3>
        <p>Total Amount: ${orderDetails.total_amount}</p>
        <p>Shipping Fees: ${orderDetails.shipping_fees}</p>
        <p>Status: {orderDetails.status}</p>
        <p>Order Date: {orderDetails.order_date}</p>
        <p>Address: {orderDetails.address}</p>
      </div>
      <div className="order-items">
        <h4>Order Items</h4>
        {orderDetails.order_items.map(item => (
          <div key={item.id} className="order-item">
            <img src={item.product.image_url} alt={item.product.name} />
            <div className="order-item-details">
              <h5>{item.product.name}</h5>
              <p>Quantity: {item.quantity}</p>
              <p>Subtotal Amount: ${item.subtotal_amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
