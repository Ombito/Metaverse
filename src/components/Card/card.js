import React, { useState } from 'react';
import { FaHeart, FaStar, FaShoppingCart } from 'react-icons/fa';
import './card.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Card = ({ product, addToCart, addToFavorites, favorite}) => {  
    const navigate = useNavigate();
    const isFavorite =  favorite && favorite.some(item => item.id === product.id);

    const filledStars = Array.from({ length: 5 }, (_, index) => (
        <FaStar key={index} className={index < product.rating ? "star-icon filled" : "star-icon"} />
    ));

    const handleAddToCart = () => {
        addToCart(product); 
        console.log('item added to cart')        
    };

    const handleFavoriteClick = () => {
        addToFavorites(product); 
    };

   
    return (
        <div className="card">
            <Link to={{
                pathname: `/${encodeURIComponent(product.name)}/${encodeURIComponent(product.id)}`,
                state: { product }
            }}>
                <div className="image-container">
                    <img src={product.image_url} alt="Product item" />
                </div>
                <div className="product-details">
                    <p className="product-name">{product.name}</p>
                    <div className="price-div">
                        <div className="price">
                            <p className="discounted-price">Ksh {product.price}</p>
                            <p className="original-price">Ksh{((product.price * 116) / 100).toFixed(0)}</p>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="cart-icon" onClick={handleAddToCart}>
                <i class="ri-shopping-cart-2-line ri-lg" id='cart-icon' color='orange'></i>
                {/* <FaShoppingCart onClick={handleAddToCart} color='green'size='22'/> */}
            </div>
            <div className="favorite-icon" onClick={handleFavoriteClick}>
                <FaHeart color={isFavorite ? 'red' : 'gray'}/>
            </div>
        </div>
    );
};

export default Card;
