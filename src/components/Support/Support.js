import React from 'react'
import './support.css';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaUser, FaHeart, FaClipboardList, FaTicketAlt, FaHeadset, FaSignOutAlt, FaCog } from 'react-icons/fa';


const Support = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

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
    <div className='support-container'>
      <div className='support-container-div'>
        <div id='support-navlinks' className="my-account-nav">
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
        <div className='support-hero'>
          <h2>Help Center</h2>
          <p style={{'margin': '1em 0'}}>Welcome to our Help Center! Here you can find answers to common questions and get support for any issues you may encounter.</p>
          <div className="faq-section">
            <h3>FREQUENTLY ASKED QUESTIONS</h3>
            <div className="faq-list">
              <div className="faq-item">
                <h4>How do I place an order?</h4>
                <p>To place an order, simply browse our products, add items to your cart, and proceed to checkout.</p>
              </div>
              <div className="faq-item">
                <h4>What payment methods do you accept?</h4>
                <p>We accept Visa, Mpesa, American Express, and PayPal.</p>
              </div>
            </div>
          </div>
          <div className="contact-section">
            <h3>CONTACT US</h3>
            <p style={{'margin': '1em 0'}}>If you need further assistance, feel free to contact our support team:</p>
            <ul>
              <li>Email: support@estore.com</li>
              <li>Phone: +254 721 857 213</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support;