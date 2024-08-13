import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './search.css';
import Card from '../Card/card';

const Search = ({ products, addToCart, addToFavorites, favorite }) => {
  const { q } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
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
        const searchQuery = q.toLowerCase();
        const searchedItem = [];
        const otherItems = [];
        products.forEach(product => {
          if (product.name.toLowerCase().includes(searchQuery)) {
            searchedItem.push(product);
          } else if (product.category.toLowerCase().includes(searchQuery)) {
            otherItems.push(product);
          }
        });
    
        const filteredOtherItems = otherItems.filter(item => {
          return searchedItem.some(searched => searched.category === item.category);
        });
    
        const results = searchedItem.concat(filteredOtherItems);
        setSearchResults(results);
      }, [q, products]);
      
      const handleCategoryClick = (categoryName) => {
        navigate(`/products/${categoryName}`);
      };

  return (
    <div className="search-container">
        <p>Home &gt; All products &gt; {q}</p>
        {searchResults.length > 0 ? (
            <div className="search-container-hero">
                <div className="search-category-div">
                    <h3>CATEGORY</h3>
                    {categories.map(category => (
                        <p key={category.key} onClick={() => handleCategoryClick(category.name)} >{category.name}</p>
                    ))}
                </div>
                <div>
                    <h2>Search Results for "{q}"</h2>       
                    {searchResults.map(product => (
                        <Card key={product.id} product={product} addToCart={() => addToCart(product, quantity)} addToFavorites={addToFavorites} favorite={favorite}/>
                    ))}
                </div>
            </div>
        ) : (
            <p>No items found for "{q}".</p>
        )}
    </div>
  );
};

export default Search;
