import React, { useState, useEffect } from 'react';
import './productDetails.css';
import { useParams } from 'react-router-dom';
import Image from '../../assets/mango.jpg';
import { FaHeart, FaStar, FaFacebook, FaTwitter, FaTruck, FaCheck  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import User from '../../assets/user.jpg';
import Card from '../Card/card';


const ProductDetails = ({ products, addToCart, setCart, addToFavorites, favorite }) => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  // const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('shipping');
  const isFavorite =  favorite && favorite.some(item => item.id === productId);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  const handleNavigation = (route) => {
    navigate(route);
  };

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:5555/products/${productId}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched product:', data); 
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [productId]);

  // const fetchRelatedProducts = async (category) => {
  //     const apiUrl = `http://127.0.0.1:5555/products?category=${category}`;
  //     fetch(apiUrl)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`Network response was not ok: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log('Fetched related products:', data);
  //       setRelatedProducts(data.filter((item) => item.id !== productId)); 
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching related products:', error);
  //     });
  // };


  const filledStars = Array.from({ length: 5 }, (_, index) => (
    <FaStar key={index} className={index < (product ? product.rating : 3) ? "star-icon filled" : "star-icon"} />
  ));

  const handleAddToCart = () => {
    addToCart(product, quantity); 
    console.log('item added to cart')        
  };

  const incrementQuantity = (id) => {
    addToCart(product, quantity);
    setQuantity(prevQuantity => prevQuantity + 1);
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const decrementQuantity = (id) => {
    setQuantity(prevQuantity => prevQuantity - 1);
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };


  const flashsalesProducts = products.filter(product => product.grouping === 'trending');
  
  const handleFavoriteClick = () => {
    addToFavorites(product); 
};

  return (
    <div className='productDetails'>
      {loading ? (
        <div class="loader">
          <span class="loader-text">Loading...</span>
            <span class="load"></span>
        </div>
      ) : (
        product && (
          <div className='productDetailss-container'>
            <div className='productDetails-hero'>
              <img src={product.image_url} alt="Product" />
              <div className='productDetails-div'>
                <div className="product-name-hero">
                  <p  className='product-name-text'>{product.name}</p>
                  <FaHeart color={isFavorite ? 'red' : 'gray'} onClick={handleFavoriteClick} size='25'/>
                </div>
                <p className='product-category-text'>In stock</p>
                <p className='product-price-text'>Ksh {product.price}<span id='per-kg'>/Kg (Inc. VAT)</span></p>
                <div className="ratings">
                  {product.description}
                </div>
                <p><FaTruck className='truck-icon'/> Free delivery for orders over KES 1,999</p>  
                <div className='product-buttons'>
                  <div className='incrementing-buttons'>
                    <button className="quantity-btns" onClick={() => decrementQuantity(product.id)}>-</button>
                    <span>{quantity}</span>
                    <button className="quantity-btns" onClick={() => incrementQuantity(product.id)}>+</button>
                  </div>
                    <button id="add-to-cart-button" onClick={handleAddToCart}>ADD TO CART</button>
                  </div>
                </div>
            </div>
            <div>
              <p>SHARE THIS PRODUCT</p>
              <div>
                <FaFacebook style={{ color: 'blue' }} className="social-icon"  onClick={() => handleNavigation('/facebook')} />
                <FaTwitter style={{ color: 'black' }} className="social-icon" onClick={() => handleNavigation('/twitter')} />
              </div>
            </div>
            <div className="description-container">
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'shipping' ? 'active' : ''}`}
          onClick={() => handleTabChange('shipping')}
        >
          Shipping & Returns
        </button>
        <button
          className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => handleTabChange('reviews')}
        >
          Reviews
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'shipping' && (
          <div className="shipping-content">
            <h4>SHIPPING POLICY</h4>
            <p>At our company, we understand the importance of timely and reliable shipping for our customers. We are committed to providing a transparent and efficient shipping process that meets your expectations. Our standard shipping method is ground shipping, which typically takes 1-3 business days for delivery. Our shipping rates are calculated based on the weight and size of the package, as well as the shipping destination. We use real-time shipping rates from major carriers to ensure accurate and competitive pricing. You can view the shipping cost for your order during the checkout process.</p>
            <h4>RETURN POLICY</h4>
            <p>If you are not satisfied with your order, you can return it for a refund or exchange within 5 days of purchase. All returns must be in their original condition with all tags and packaging intact. You are responsible for the cost of return shipping unless the item is defective or damaged.</p>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="reviews-content">
            <h3>Reviews</h3>
            <div className="review-item">
              <p>No Reviews</p>
            </div>
            
          </div>
        )}
      </div>
    </div>
            <div className="related-products-container">
              <h3>Related Products</h3>
              <div className='related-items'>
                {flashsalesProducts.map(product => (
                  <Card key={product.id} product={product} addToCart={addToCart}/>
                  ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductDetails;
