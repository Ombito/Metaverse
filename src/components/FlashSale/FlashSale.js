import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import './flashSale.css';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/card';


const FlashSale = ({ addToCart, addToFavorites, favorite, products }) => {
    const navigate = useNavigate();
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  
  const flashsalesProducts = products.filter(product => product.grouping === 'Flash sales');

  return (
    <div className="flash-sales-container">
      {loading ? (
        <div class="loader">
          <span class="loader-text">Loading...</span>
          <span class="load"></span>
        </div>
      ) : (
      <>  
        <h2>Flash Sales</h2>
        <div className="flash-sales-div">
          {flashsalesProducts.map(product => (
            <Card key={product.id} product={product} addToCart={() => addToCart(product, quantity)} addToFavorites={addToFavorites} favorite={favorite} favorite={favorite} />
          ))}
        </div>
      </>
      )}
    </div>
  );
};

export default FlashSale;