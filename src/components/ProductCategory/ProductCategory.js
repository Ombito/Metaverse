import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import './productCategory.css';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/card';


const ProductCategory = ({ addToCart, addToFavorites, favorite }) => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const categories = [
    { name: 'Dairy Products', image: require('../../assets/dairy.jpg'), key: '2' },
    { name: 'Fruits', image: require('../../assets/fruits.jpg'), key: '3' },
    { name: 'Meat & Poultry', image: require('../../assets/beef.jpg'), key: '4' },
    { name: 'Grains', image: require('../../assets/grains.jpg'), key: '5' },
    { name: 'Fresh Vegetables', image: require('../../assets/vegetables.jpg'), key: '6' },
    { name: 'Honey Products', image: require('../../assets/honey.jpg'), key: '9' },
    { name: 'Sugarcane Products', image: require('../../assets/sugarcane1.jpg'), key: '10' },
    { name: 'Nuts & Seeds', image: require('../../assets/nuts&seeds.jpg'), key: '11' },
    { name: 'Fish & Seafood', image: require('../../assets/fish.jpg'), key: '12' },
    { name: 'Beverages', image: require('../../assets/tea.jpg'), key: '13' },
    { name: 'Other Produce', image: require('../../assets/mushroom.jpg'), key: '13' },
  ];

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:5555/products`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched products:', data); 
        setProducts(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  
  const categoryProducts = products.filter(product => product.category === categoryName);

  const handleCategoryClick = (categoryName) => {
    navigate(`/products/${categoryName}`);
  };

  return (
    <div className="product-category">
      {loading ? (
        <div class="loader">
          <span class="loader-text">Loading...</span>
          <span class="load"></span>
        </div>
      ) : (
      <div className="product-category-hero">  
        <div className="product-category-div">
          <h3>CATEGORY</h3>
          {categories.map(category => (
            <p key={category.key} onClick={() => handleCategoryClick(category.name)} >{category.name}</p>
          ))}
        </div>
        <div className="product-category-items">
          <h2>{categoryName}</h2>
          <div className="category-card">
            {categoryProducts.map(product => (
              <Card key={product.id} product={product} addToCart={() => addToCart(product, quantity)} addToFavorites={addToFavorites} favorite={favorite} />
            ))}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ProductCategory;