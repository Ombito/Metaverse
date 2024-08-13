import React from 'react'
import './notification.css';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaUser, FaHeart, FaClipboardList, FaTicketAlt, FaHeadset, FaSignOutAlt, FaCog } from 'react-icons/fa';


const Notification = ({ user, setUser }) => {
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
    <div className='notification-container'>
      <div className='notification-container-div'>
        <div id='notification-navlinks' className="my-account-nav">
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
        <div className='notification-hero'>
          <h2>Notification</h2>
          <p>You don't have any messages.</p>
        </div>
      </div>
    </div>
  )
}

export default Notification;