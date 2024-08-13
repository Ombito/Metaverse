import React from 'react'
import './settings.css';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaUser, FaHeart, FaClipboardList, FaTicketAlt, FaHeadset, FaSignOutAlt, FaCog } from 'react-icons/fa';


const Settings = () => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className='settings-container'>
      <h2>Settings</h2>
      <div className='settings-container-div'>
        <div className="my-account-nav">
          <ul>
            <li onClick={() => handleNavigate('/my-account')}><FaUser /> My Account</li>
            <li onClick={() => handleNavigate('/orders')}><FaClipboardList /> Orders</li>
            <li onClick={() => handleNavigate('/notifications')}><FaEnvelope /> Notifications</li>
            <li onClick={() => handleNavigate('/favorites')}><FaHeart /> Favourite</li>
            <li onClick={() => handleNavigate('/vouchers')}><FaTicketAlt /> Vouchers</li>
            <li onClick={() => handleNavigate('/customer-support')}><FaHeadset /> Support</li>
            <li onClick={() => handleNavigate('/settings')}><FaCog /> Settings</li>
          </ul>
          <button className='logout-button'><FaSignOutAlt /> Logout</button>
        </div>
        <div className='settings-hero'></div>
      </div>
    </div>
  )
}

export default Settings;