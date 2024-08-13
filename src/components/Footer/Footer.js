import React from 'react';
import './footer.css';
import Playstore from '../../assets/playstore.jpg';
import Appstore from '../../assets/app-store.jpg';
import { FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Newsletter from '../Newsletter/Newsletter';

const Footer = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Submitted successfully')
  }

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div>
      <Newsletter />
      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <h3>Account</h3>
            <ul>
              <li onClick={() => handleNavigation('/my-account')}>My Account</li>
              <li onClick={() => handleNavigation('/signin')}>Login / Register</li>
              <li onClick={() => handleNavigation('/cart')}>Cart</li>
              <li onClick={() => handleNavigation('/favorites')}>Favourite</li>
              <li onClick={() => handleNavigation('/orders')}>Orders</li>
              <li onClick={() => handleNavigation('/notifications')}>Notification</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li onClick={() => handleNavigation('/flash-sales')}>Flash Sales</li>
              <li onClick={() => handleNavigation('/forgot-password')}>Forgot Password</li>
              <li onClick={() => handleNavigation('/careers')}>Careers</li>
              <li onClick={() => handleNavigation('/privacy-policy')}>Privacy Policy</li>
              <li onClick={() => handleNavigation('/helpcenter')}>Help Center</li>
              <li onClick={() => handleNavigation('/terms&conditions')}>Terms & Conditions</li>
              <li onClick={() => handleNavigation('/faqs')}>FAQs</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li onClick={() => handleNavigation('/contact')}>Contact Us</li>
              <li onClick={() => handleNavigation('/returns')}>Returns & Refunds</li>
              <li onClick={() => handleNavigation('/sellers')}>Want to be a seller?</li>
              <li onClick={() => handleNavigation('/track-orders')}>Track your order</li>
              <li onClick={() => handleNavigation('/support-email')}>support@e-store.com</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Download App</h3>
            <div className="app-links">
              <a onClick={() => handleNavigation('/appstore')} className="app-link"><img src={Appstore} alt="Download on App Store"  /></a>
              <a onClick={() => handleNavigation('/playstore')} className="app-link"><img src={Playstore} alt="Download on Google Play" /></a>
            </div>
            <div className="social-icons">
              <FaFacebook className="social-icon" onClick={() => handleNavigation('/facebook')} />
              <FaTwitter className="social-icon" onClick={() => handleNavigation('/twitter')} />
              <FaInstagram className="social-icon" onClick={() => handleNavigation('/instagram')} />
              <FaLinkedin className="social-icon" onClick={() => handleNavigation('/linkedin')} />
            </div>
          </div>  
        </div>
        <div className="copyright">
          <p>&copy; Copyright e-STORE 2024. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer;


