import React from 'react';
import './orders.css';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaUser, FaHeart, FaClipboardList, FaTicketAlt, FaHeadset, FaSignOutAlt, FaCog } from 'react-icons/fa';
import Card from '../Card/card';

const Orders = ({ user, setUser, products, addToCart }) => {
  const navigate = useNavigate();

  const handleNavigationToShopping = () => {
    navigate('/')
  };

  const handleNavigation3 = (orderId, orderDetails) => {
    navigate(`/order-details/${orderId}`, { state: { orderDetails } });
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  const flashsalesProducts = products.filter(product => product.grouping === 'Flash sales');

  const handleLogout = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to logout?");
      if (!confirmed) {
        return;
      }
      localStorage.removeItem('token');
      const response = await fetch('http://127.0.0.1:5555/logout_user', {
        method: 'DELETE',
      });
      if (response.ok) {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
        return response.json();
      } else {
        console.error('Failed to logout:', response.status);
      }
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };
  return (
    <div className="orders-container">
      {user ? (
        <>
          <div className="orders-hero">
            <div id='order-navlinks' className="my-account-nav">
              <ul>
                <li onClick={() => handleNavigate('/my-account')}><FaUser /> My Account</li>
                <li onClick={() => handleNavigate('/orders')}><FaClipboardList /> Orders</li>
                <li onClick={() => handleNavigate('/notifications')}><FaEnvelope /> Notifications</li>
                <li onClick={() => handleNavigate('/favorites')}><FaHeart /> Favourite</li>
                <li onClick={() => handleNavigate('/vouchers')}><FaTicketAlt /> Vouchers</li>
                <li onClick={() => handleNavigate('/helpcenter')}><FaHeadset /> Help Center</li>
              </ul>
              <button onClick={handleLogout} className='logout-button'><FaSignOutAlt /> Logout</button>
            </div>
            {user.orders && user.orders.length === 0 ? (
              <div className="no-orders-message">
                <p>You have not made any orders.</p>
                <button onClick={handleNavigationToShopping}>Continue Shopping</button>
              </div>
            ) : (
              <div className="my-orders">
                <h2>Orders</h2>
                {user.orders.map(order => (
                  <div key={order.id} className="order-item">
                    {order.order_items && order.order_items[0] && (
                      <div key={order.order_items[0].id}>
                        <img src={order.order_items[0].product.image_url} alt={order.order_items[0].product.name} />
                        <div className="order-details">
                          <h4>{order.order_items[0].product.name}</h4>
                        </div>
                      </div>
                    )}
                    <div className='order-details-div'>
                      <div>
                        <h3>Order #{order.id}</h3>
                        <p className={order.status === 'delivered' ? 'delivered-status' : 'pending-status'}>{order.status}</p>
                        <p>Ksh {order.total_amount}</p>
                        <p>On {order.order_date}</p>
                      </div>
                      <button onClick={() => handleNavigation3(order.id, order)}>SEE DETAILS</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='top-selling-container'>
            <h3>Top Selling Products</h3>
            <div className="flash-sales-div">
              {flashsalesProducts.map(product => (
                <Card key={product.id} product={product} addToCart={addToCart}/>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="signin-message">
          <p>Sign in to view your account</p>
          <button onClick={() => handleNavigate('/signin')}>Sign in</button>
        </div>
      )}
    </div>
  );
};

export default Orders;
