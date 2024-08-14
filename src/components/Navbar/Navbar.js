import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaBars, FaTimes, FaUser, FaBell, FaHeart, FaChevronDown, FaClipboardList, FaShoppingCart, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import '../Navbar/navbar.css';
import Logo from '../../assets/banner.jpg';

const Navbar = ({ user, setUser, size, products }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const searchContainerRef = useRef(null);
  const cartLength = size;

  const handleNavigate = (route) => {
    navigate(route);
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleSearch = () => {
    navigate(`/search/${searchQuery}`);
    setSearchQuery('');
    setSuggestions([]);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);

    const results = products.filter(product =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(results);

    fetch('/suggestions.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const filteredSuggestions = data.suggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      });
  
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

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
    if (
      searchContainerRef.current && !searchContainerRef.current.contains(event.target)
    ) {
      setSuggestions([]);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-large-screen">
        <div className="navba">
          <Link to='/'>
            <img className="logo" src={Logo} alt="Logo" />
          </Link>
          <div className="search-hero">
            <div className="search-containe" ref={searchContainerRef}>
              <FaSearch className="search-icon" />
              <input value={searchQuery} onChange={handleInputChange} type="text" className="search-input" placeholder="Search for products and categories..." required />
              {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => setSearchQuery(suggestion)}>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button onClick={handleSearch} className="search-button">SEARCH</button>
          </div>
        </div>  
        <div className="icon-row">
          <div className="cart-ico" onClick={() => handleNavigate('/cart')}>
            <i class="ri-shopping-cart-2-line ri-lg" id='cart-icon'></i>
            {cartLength > 0 && <div className="cart-items">{cartLength}</div>}
            <span id="cart-name">Cart</span>
          </div>
          <div className="user-icon">
            {user ? (
              <div className="nav-account-icon" onClick={toggleDropdown}>
                <i class="ri-user-follow-line ri-lg" id='user-icon'></i>
                <span className="nav-tag">Hi, {user.first_name}</span>
              </div>
              ) : (
                <div className="nav-account-icon" onClick={toggleDropdown}>
                  <i class="ri-user-follow-line ri-lg" id='user-icon'></i>
                  <span id="account-icon" onclick={toggleDropdown} style={{'font-weight': 'bold'}} className="icon-label">Account</span>
                </div>
                )}
                <div className="dropdown" ref={dropdownRef}>
              <button id='dropdown-icon' className="dropdown-toggle" onClick={toggleDropdown}>
                <FaChevronDown />
              </button>
              {dropdownVisible && !user && (
                <div className="dropdown-menu">
                  <div className="sign-in-button" onClick={() => handleNavigate('/signin')}>
                  Sign in
                  </div>
                </div>
              )}
              {dropdownVisible && user && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={() => handleNavigate('/my-account')}>
                    <i class="ri-user-follow-line ri-lg"></i>
                    <span className="icon-label">My Account</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavigate('/notifications')}>
                    <i class="ri-notification-line ri-lg"></i>
                    <span className="icon-label">Notifications</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavigate('/orders')}>
                    <i class="ri-clipboard-line ri-lg"></i>
                    <span className="icon-label">Orders</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavigate('/favorites')}>
                    < i class="ri-heart-3-line ri-lg"></i>
                    <span className="icon-label">Favorites</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavigate('/helpcenter')}>
                  <i class="ri-customer-service-2-line ri-lg"></i>
                    <span className="icon-label">Help Center</span>
                  </div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    <i class="ri-logout-box-r-line ri-lg"></i>
                    <span className="icon-label">Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-mobile-screen">
        <div className="mobile-hero" onClick={toggleMenu}>
          <div className="mobile-logo-div">
            <Link to='/'>
              <img className="mobile-logo" src={Logo} alt="Logo" />
            </Link>
          </div>
          <div className="mobile-icons">
            <div className="cart-ico" onClick={() => handleNavigate('/cart')}>
              <i class="ri-shopping-cart-2-line ri-lg" id='cart-icon'></i>
              {cartLength > 0 && <div className="cart-items">{cartLength}</div>}
            </div>
            <div className="mobile-account-icon" onClick={toggleDropdown}>
              <i class="ri-user-follow-line ri-lg" id='user-icon'></i>
                {dropdownVisible && !user && (
                <div className="dropdown-menu">
                  <div className="sign-in-button" onClick={() => handleNavigate('/signin')}>
                  Sign in
                  </div>
                </div>
              )}
              {dropdownVisible && user && (
                <div className="dropdown-menu">
                  <div className="dropdown-item" onClick={() => handleNavigate('/my-account')}>
                    <i class="ri-user-follow-line ri-lg"></i>
                    <span className="icon-label">My Account</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavigate('/notifications')}>
                    <i class="ri-notification-line ri-lg"></i>
                    <span className="icon-label">Notifications</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavigate('/orders')}>
                    <i class="ri-clipboard-line ri-lg"></i>
                    <span className="icon-label">Orders</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavigate('/favorites')}>
                    < i class="ri-heart-3-line ri-lg"></i>
                    <span className="icon-label">Favorites</span>
                  </div>
                  <div className="dropdown-item" onClick={() => handleNavigate('/helpcenter')}>
                  <i class="ri-customer-service-2-line ri-lg"></i>
                    <span className="icon-label">Help Center</span>
                  </div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    <i class="ri-logout-box-r-line ri-lg"></i>
                    <span className="icon-label">Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mobile-search" ref={searchContainerRef}>
          <FaSearch className="search-icon" />
          <input value={searchQuery} onChange={handleInputChange} type="text" className="search-input" placeholder="Search for products..." required />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => setSearchQuery(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <button onClick={handleSearch} className="mobile-search-button">SEARCH</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
