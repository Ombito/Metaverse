import React, { useState } from 'react';
import './cart.css';
import { useNavigate } from 'react-router-dom';
import Image from '../../assets/mango.jpg';
import Empty from '../../assets/emptycart.png';
import { FaTrashAlt } from 'react-icons/fa';
import Card from '../Card/card';

const Cart = ({ cart, setCart, products, addToCart, user, addToFavorites, favorite }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleSignin = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/signin');
    }
  };

  const incrementQuantity = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart(prevCart =>
      prevCart.filter(item => item.id !== id)
    );
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = 10;
    return subtotal + shipping;
  };

  const handleNavigate = (route) => {
    navigate(route);
  };

  const flashsalesProducts = products.filter(product => product.grouping === 'trending');
  console.log({cart})
  
  
  return (
    <div className="cart">
      <h2>My Cart({cart.length})</h2>
      {cart.length === 0 ? (
        <div id="empty-cart-div">
          <img src={Empty} alt="Empty Cart" />
          <button onClick={() => handleNavigate('/')}>START SHOPPING</button>
        </div>
        ) : (
        <>
          <div className="cart-container">
            <>
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(product => (
                    <tr key={product.id}>
                      <td className="product">
                        <div className="product-div">
                          <img src={product.image_url} alt="Product" />
                          <span>{product.name}</span>
                        </div>
                        <button className="remove-btn" onClick={() => handleRemove(product.id)}><FaTrashAlt /> Remove</button>
                      </td>
                      <td className="quantity">
                        <button className="quantity-btn" onClick={() => decrementQuantity(product.id)}>-</button>
                        <span>{product.quantity}</span>
                        <button className="quantity-btn" onClick={() => incrementQuantity(product.id)}>+</button>
                      </td>
                      <td className="amount">Ksh {product.price}</td> 
                      <td className="subtotal">Ksh {product.price * product.quantity}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
            <div className="cart-total">
              <div className="total-container">
                <h4>Cart Total</h4>
                <div className="total-details">
                  <div className="subtotal-amount" >
                    <p>Subtotal</p>
                    <p>Ksh {calculateSubtotal()}</p>
                  </div>
                  <div className="shipping" style={{'border-bottom': '1px solid gray'}}>
                    <p>Shipping</p>
                    <p>Ksh 10</p>
                  </div>
                  <div className="total">
                    <h4>Total</h4>
                    <h4>Ksh {calculateTotal()}</h4>
                  </div>
                </div>
                <button className="checkout-btn" onClick={handleSignin}>Proceed to checkout (Ksh {calculateTotal()})</button>
              </div>
            </div>
          </div>
          <button className="continue-shopping" onClick={() => handleNavigate('/')}>Continue Shopping</button>
          <div>
            <h3>Top Selling Products</h3>
            <div className="top-selling-div">
              {flashsalesProducts.map(product => (
                <Card key={product.id} product={product} addToCart={() => addToCart(product, quantity)} addToFavorites={addToFavorites} favorite={favorite}/>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart;