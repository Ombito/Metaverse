import React, { useState, useEffect } from 'react';
import Card from '../Card/card';
import './favourite.css';
import { FaEnvelope, FaUser, FaHeart, FaClipboardList, FaTicketAlt, FaHeadset, FaCog, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Favorite = ({ user, setUser, favorite, addToCart, addToFavorites, products }) => {
  const navigate = useNavigate();
  const isFavorite =  favorite && favorite.some(item => item.id === products.id);
  const [quantity, setQuantity] = useState(1);

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
    <div className="favorite-container">
      {user ? (
      <div className="favorite-container-div">
        <div id='favorite-navlinks' className="my-account-nav">
          <ul>
            <li onClick={() => handleNavigate('/my-account')}><FaUser /> My Account</li>
            <li onClick={() => handleNavigate('/orders')}><FaClipboardList /> Orders</li>
            <li onClick={() => handleNavigate('/notifications')}><FaEnvelope /> Notifications</li>
            <li onClick={() => handleNavigate('/favorites')}><FaHeart /> Favourite</li>
            <li onClick={() => handleNavigate('/vouchers')}><FaTicketAlt /> Vouchers</li>
            <li onClick={() => handleNavigate('/helpcenter')}><FaHeadset /> Help Center</li>
          </ul>
          <button onClick={handleLogout} className='logout-button'><FaSignOutAlt /> Logout</button>
        </div >
        <div className='favourite-hero'>
          <h2>Favorite Products</h2>
            {favorite.length === 0 ? (
              <p>No favorite items. Please add some items to your favorites!</p>
            ) : (
            <div className="product-container">
              {favorite.map(product => (
                <Card key={product.id} product={product} addToCart={() => addToCart(product, quantity)} addToFavorites={addToFavorites} favorite={favorite}/>
              ))}
            </div>
            )}
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

export default Favorite;
