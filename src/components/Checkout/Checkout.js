import React, { useState } from 'react';
import './checkout.css'; 
import Visa from '../../assets/visa1.png';
import Mpesa from '../../assets/mpesa.png';
import Metamask from '../../assets/metamask.jpg';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';


const Modal = ({ isVisible }) => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className={`modal ${isVisible ? 'show' : 'hide'}`}>
      <div className="modal-content">
        <FaCheckCircle className="success-icon" />
        <h2>Your Order is Confirmed.</h2>
        <p>We've received your order and we will contact you as soon as your package is shipped.</p>
        <h3>Order ID #25353</h3>
        <div className="modal-buttons">
          <button className="modal-button" onClick={() => handleNavigate('/orders')}>Track Order</button>
          <button className="modal-button" onClick={() => handleNavigate('/')}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
};

const Checkout = ({ cart, setCart, user }) => {
  const [checkedOption, setCheckedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  console.log({user})
  const handleCheckboxChange = (id) => {
    setCheckedOption(id === checkedOption ? null : id);
    setShowPhoneInput(id === 'mpesa');
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, curr) => acc + curr.price, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = 50; 
    return subtotal + shipping;
  };

  const handleSubmitOrder = async (event) => {
    event.preventDefault();

    if (!checkedOption) {
      setError('Please select at least one payment option.');
      return;
    }

    const address = [
      event.target.fullName.value,
      event.target.townCity.value,
      event.target.estate.value,
      event.target.streetName.value, 
      event.target.phoneNumber.value
    ].filter(Boolean).join(', ');

    try {
      const response = await fetch('http://127.0.0.1:5555/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: address,
          total_amount: calculateTotal(),
          user_id: user.id, 
          status: 'In Progress',
          shipping_fees: 50,
          order_items: cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            subtotal_amount: item.price * item.quantity
          }))
        }),
      });
      if (response.ok) {
        console.log('Order placed successfully');      
        if (checkedOption === 'mpesa' && event.target.mpesaNumber) {
          await postPaymentDetails(event.target.mpesaNumber.value);
        } 
        event.target.reset();       
      } else {
        console.error('Failed to place order');
        setError('Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Error placing order.');
    }
  };

  const postPaymentDetails = async (mpesaNumber) => {
    try {
      const payResponse = await fetch('http://127.0.0.1:5555/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: calculateTotal(),
          mpesa_number: mpesaNumber,
          status: 'Paid',
          user_id: user.id,
        }),
      });
      if (payResponse.ok) {
        setCart([]);
        setShowModal(true);
        console.log('Payment details submitted successfully');
      } else {
        console.error('Failed to submit payment details');
        setError('Failed to submit payment details.');
      }
    } catch (error) {
      console.error('Error submitting payment details:', error);
      setError('Error submitting payment details.');
    }
  };
 

  return (
    <div className="checkout-container">
      {user ? (
        <>
          <h2>Billing Details</h2>
          <form className="checkout-div" onSubmit={handleSubmitOrder}>
            <div className="billing-details">
              <label htmlFor="name" className="form-label">
                Full Name<span className="required">*</span>
              </label>
              <input id="street-name" name="fullName" type="text" className="form-input" placeholder="Enter your full name" required />
              <label htmlFor="town-city" className="form-label">
                City/Town<span className="required">*</span>
              </label>
              <input id="town-city" name="townCity" type="text" className="form-input" placeholder="Enter City / Town" required />
              <label htmlFor="first-name" className="form-label">
                Estate<span className="required">*</span>
              </label>
              <input id="street-name" name="estate" type="text" className="form-input" placeholder="Your estate name" required />
              <label htmlFor="apartment" className="form-label">
              Street Name, Apartment, floor, etc.
              </label>
              <input id="apartment" name="streetName" type="text" className="form-input" placeholder="Enter street name, Apartment" />
              <label htmlFor="phone-number" className="form-label">
                Phone Number<span className="required">*</span>
              </label>
              <input id="phone-number" name="phoneNumber" type="text" className="form-input" placeholder="Enter your phone number" required />
            </div>

            <div>
              <div className="coupon-section">
                <input type="text" placeholder="Coupon Code" />
                <button>Apply Coupon</button>
              </div>
              <div className="summary">
                <h3 style={{textAlign: 'center'}}>Order Summary</h3>
                <div className="summary-item">
                  <p>Subtotal</p>
                  <p>Ksh {calculateSubtotal()}</p>
                </div>
                <div className="summary-item" style={{'border-bottom': '1px solid gray'}}>
                  <p>Shipping</p>
                  <p>Ksh 50</p>
                </div>
                <div className="summary-item">
                  <h3>Total</h3>
                  <h3>Ksh {calculateTotal()}</h3>
                </div>
              </div>
              <div className="payment-methods">
                <h3 style={{textAlign: 'center'}}>Payment Details</h3>
                {error && <p className="error-message">{error}</p>}
                <div>
                  <div className="payment-method">
                    <input type="checkbox" 
                      id="mpesa" 
                      className="payment-checkbox" 
                      checked={checkedOption === 'mpesa'}
                      onChange={() => handleCheckboxChange('mpesa')}
                    />
                    <div className="payment-items-div">
                      <label htmlFor="bank">Mpesa</label>
                      <img src={Mpesa} alt="Mpesa" className="payment-img" />
                    </div>
                  </div>
                  {showPhoneInput && (
                    <div className="phone-input-container">
                      <input id="phone-number" name="mpesaNumber" type="text" className="form-input" placeholder="Enter your Mpesa number" required />
                    </div>
                  )}
                </div>
                {/* <div className="payment-method">
                  <input type="checkbox" 
                    id="bank" 
                    className="payment-checkbox" 
                    checked={checkedOption === 'bank'}
                    onChange={() => handleCheckboxChange('bank')}
                  />
                  <div className="payment-items-div">
                    <label htmlFor="bank">Visa</label>
                    <img src={Visa} alt="Visa" className="payment-img" style={{ width: '4vw'}} />
                  </div>
                </div> */}
                <div className="payment-method">
                  <input type="checkbox"
                    id="cash-on-delivery"
                    className="payment-checkbox"
                    checked={checkedOption === 'cash-on-delivery'}
                    onChange={() => handleCheckboxChange('cash-on-delivery')}
                  />
                  <label htmlFor="cash-on-delivery">Cash on delivery</label>
                </div>
              </div>
              <button type="submit"  className="place-order-button">PAY NOW (Ksh {calculateTotal()})</button>
            </div>
          </form>
          <Modal isVisible={showModal} onClose={() => setShowModal(false)} />
        </>
    ) : (
      <div className="sign-into">
        <p>Sign in to continue to checkout</p>
        <button onClick={() => handleNavigate('/signin')}>Sign in</button>
      </div>
    )}
    </div>
  );
};

export default Checkout;

