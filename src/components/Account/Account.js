import React, { useState } from 'react';
import './account.css';
import { useNavigate } from 'react-router-dom';
import Profile from '../../assets/user.jpg';
import { FaEnvelope, FaUser, FaHeart, FaClipboardList, FaTicketAlt, FaHeadset, FaCog, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import User from '../Signin/Signin';
import { GiApc } from 'react-icons/gi';

const Account = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [name, setName] = useState(user ? `${user.first_name} ${user.last_name}` : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [phoneNumber, setPhoneNumber] = useState(user ? user.phone_number : '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('Kilimani, Nairobi');
  const [notificationModes, setNotificationModes] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleEditPersonalInfo = () => {
    setIsEditingPersonalInfo(true);
  };

  const handleEditAddress = () => {
    setIsEditingAddress(true);
  };

  const handleEditPassword = () => {
    setIsEditingPassword(true);
  };

  const handleSavePersonalInfo = () => {
    setIsEditingPersonalInfo(false);
  };

  const handleSaveAddress = () => {
    setIsEditingAddress(false);
  };

  const handleSavePassword = () => {
    setIsEditingPassword(false);
  };

  const handleCancelPersonalInfo = () => {
    setIsEditingPersonalInfo(false);
  };

  const handleCancelAddress = () => {
    setIsEditingAddress(false);
  };

  const handleCancelPassword = () => {
    setIsEditingPassword(false);
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  const navigateToSignIn = () => {
    navigate('/sign-in');
  };

  const handleCheckboxChange = (mode) => {
    setNotificationModes((prevModes) => ({
      ...prevModes,
      [mode]: !prevModes[mode],
    }));
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
    <div className="profile-container">
      {user ? (
        <div className="user-profile-account">
          <div className="profile">
            <div id='account-navlinks' className="my-account-nav">
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
            <div className='user-account-details'>
            <h2>Account Settings</h2>
              <div className="user-info">
                <img src={Profile} alt="avatar" height="60" />
                <div>
                  <h4>{name}</h4>
                  <p>{email}</p>
                </div>
              </div>
              <div className="personal-infoo">
                <div className='user-names-info'>       
                  <div className="user-personal-details">
                    <h4>Full Name</h4> 
                      <>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled
                        />                
                      </>    
                  </div>
                  <div className="user-personal-details">
                    <h4>Email Address</h4>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled
                    />
                  </div>
                  <div className="user-personal-details">
                    <h4>Phone Number</h4>
                    {isEditingPersonalInfo ? (
                      <div className="user-personal-phone-number">
                        <input
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <div className="user-personal-details-edit-btns">
                          <button className="edit-btn" onClick={handleSavePersonalInfo}>Save</button>
                          <button className="edit-btn" onClick={handleCancelPersonalInfo}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="phone-number-div">
                        <p>{phoneNumber}</p>
                        <button onClick={handleEditPersonalInfo}><FaEdit /> Edit</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="profile-details">
                <div>
                  <h3>Shipping Address</h3>
                  {isEditingAddress ? (
                    <div style={{display: 'block', 'gap': '50px' }} className="user-personal-details">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <div>
                        <button onClick={handleSaveAddress}>Save</button>
                        <button onClick={handleCancelAddress}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p>{name}</p>
                      <p>{address}</p>
                      <p>{phoneNumber}</p>
                      <button onClick={handleEditAddress}>Edit</button>
                    </>
                  )}
                </div>
                <div className='account-balance'>
                  <h3>My Credit Balance</h3>
                  <p>BALANCE: KSH 0</p>
                </div>
                <div className='password-summary'>
                  <h3>Change Password</h3>
                  <div className="password-div">
                    <div>
                      <h4>Old Password</h4>  
                        <>
                          <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </>
                    </div>
                    <div>
                      <h4>New Password</h4>
                        <>
                          <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </>
                    </div>
                    <div>
                      <h4>Confirm Password</h4>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button onClick={handleEditPassword}>Save</button>
                    </div>
                  </div>
                  </div>
                <div className='notification-modes'>
                  <h3>Notification Modes</h3>
                  <label>
                    <input
                      type="checkbox"
                      checked={notificationModes.email}
                      onChange={() => handleCheckboxChange('email')}
                    />
                    Email
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={notificationModes.sms}
                      onChange={() => handleCheckboxChange('sms')}
                    />
                    SMS
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={notificationModes.push}
                      onChange={() => handleCheckboxChange('push')}
                    />
                    Push Notifications
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="sign-into">
          <p>Sign in to view your account</p>
          <button onClick={() => handleNavigate('/signin')}>Sign in</button>
        </div>
      )}
    </div>
  );
};

export default Account;
