import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import Account from './components/Account/Account';
import Footer from './components/Footer/Footer';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import Signin from './components/Signin/Signin';
import Search from './components/Search/Search'
import Signup from './components/Signup/Signup';
import Notification from './components/Notification/Notification';
import Favorite from './components/Favourite/Favourite'; 
import Card from './components/Card/card'; 
import ProductDetails from './components/ProductDetails/ProductDetails';
import ProductCategory from './components/ProductCategory/ProductCategory';
import OrderDetails from './components/OrderDetails/OrderDetails';
import Support from './components/Support/Support';
import Careers from './components/Careers/Careers';
import Settings from './components/Settings/Settings';
import Vouchers from './components/Vouchers/Vouchers';
import FlashSale from './components/FlashSale/FlashSale';
import Error from './components/error/Error';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function App() {

  const location = useLocation();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [favorite, setFavorite] = useState([]);
  const [refresh, setRefresh]=useState(false);
  const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const addToCart = (item, quantity) => {
    let isPresent = false;
    cart.forEach((product) => {
      if (item.id === product.id) {
        isPresent = true;
      }
    });

    if (isPresent) {
      console.log('Item is already added to your Cart', { variant: 'warning' });
    } else {
      const updatedCart = [...cart, { ...item, quantity }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };
  
  const addToFavorites = (item) => {
    const userId = user?.id;
    if (!userId) {
      navigate('/signin');
      return;
    }
    const index = favorite.findIndex(product => product.id === item.id);
  
    if (index !== -1) {
      const updatedFavorites = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
      setFavorite(updatedFavorites);
            
      fetch(`http://127.0.0.1:5555/users/${userId}/favourites/${item.id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to remove item from favorites');
        }
        const updatedFavorites = favorite.filter(product => product.id !== item.id);
        setFavorite(updatedFavorites);
        console.log('Item removed from Favorites', { variant: 'success' });
      })
      .catch(error => {
        console.error('Error removing item from favorites:', error);
      });
    } 
    else {
      const updatedFavorites = [...favorite, item];
      setFavorite(updatedFavorites);
      
      fetch(`http://127.0.0.1:5555/favourites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          product_id: item.id,
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add item to favorites');
        }
        console.log('Item added to Favorites', { variant: 'success' });
      })
      .catch(error => {
        console.error('Error adding item to favorites:', error);
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.user_id;
      fetchUserDetails(userId);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken.user_id;
        fetchUserDetails(userId);
      }
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/users/${userId}`, {
    
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error('Failed to fetch user details:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  useEffect(() => {
    const apiUrl1 = `http://127.0.0.1:5555/products`;
    fetch(apiUrl1)
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

  const fetchUserFavorites = () => {
    if (user && user.id) {
      fetch(`http://127.0.0.1:5555/users/${user.id}/favourites`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Failed to fetch user favorites');
        })
        .then(data => {
          setFavorite(data);
        })
        .catch(error => {
          console.error('Error fetching user favorites:', error);
        });
    }
  };

  useEffect(() => {
    fetchUserFavorites();
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.user_id;
      fetchUserDetails(userId);
    }
  }, []);
  
  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      Cookies.set('userData', JSON.stringify(user), { expires: 7 });
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
  }, [favorite]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className='my-app'>
      {location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/forgot-password' && <Navbar user={user} setUser={setUser} size={cart.length} products={products} />}
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} addToFavorites={addToFavorites} favorite={favorite} products={products}/>} />
        <Route path="/search/:q" element={<Search products={products} addToCart={addToCart} addToFavorites={addToFavorites} favorite={favorite} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} products={products} addToCart={addToCart} user={user} addToFavorites={addToFavorites} favorite={favorite}/>} />
        <Route path="/my-account" element={<Account user={user} setUser={setUser} />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} user={user} />} />
        <Route path="/orders" element={<Orders user={user} setUser={setUser} products={products} addToCart={addToCart}/>} />
        <Route path="/order-details" element={<OrderDetails user={user} />} />
        <Route path="/notifications" element={<Notification setUser={setUser} />} />
        <Route path="/favorites" element={<Favorite favorite={favorite} user={user} setUser={setUser} addToFavorites={addToFavorites} products={products} addToCart={addToCart}/>} /> 
        <Route path="/signin" element={<Signin setUser={setUser}/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products/:categoryName" element={<ProductCategory addToCart={addToCart} addToFavorites={addToFavorites} favorite={favorite} />} />
        <Route path="/:productName/:productId" element={<ProductDetails addToCart={addToCart} cart={cart} setCart={setCart} products={products} addToFavorites={addToFavorites} favorite={favorite}/>} />
        <Route path="/helpcenter" element={<Support user={user} setUser={setUser} />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
        <Route path="/vouchers" element={<Vouchers user={user} setUser={setUser} />} />
        <Route path="/flash-sales" element={<FlashSale addToCart={addToCart} cart={cart} setCart={setCart} products={products} addToFavorites={addToFavorites} favorite={favorite} />}/>} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
      {location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/forgot-password' && <Footer />}
    </div>

  );
}

export default App;
