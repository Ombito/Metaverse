import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';
import banner4 from '../../assets/banner4.jpg';
import banner5 from '../../assets/banner2.jpg';
import './home.css';
import Card from '../Card/card';
import { FaChevronUp, FaHeadset, FaShieldAlt, FaBolt, FaTruck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Home = ({ addToCart, addToFavorites, favorite, products }) => {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAllOrganic, setShowAllOrganic] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const categories = [
    { name: 'Dairy Products', image: require('../../assets/dairy.jpg'), key: '2' },
    { name: 'Fruits', image: require('../../assets/fruits.jpg'), key: '3' },
    { name: 'Meat & Poultry', image: require('../../assets/beef.jpg'), key: '4' },
    { name: 'Grains', image: require('../../assets/grains.jpg'), key: '5' },
    { name: 'Fresh Vegetables', image: require('../../assets/vegetables.jpg'), key: '6' },
    { name: 'Fish & Seafood', image: require('../../assets/fish.jpg'), key: '12' },
    { name: 'Honey Products', image: require('../../assets/honey.jpg'), key: '9' },
    { name: 'Sugarcane Products', image: require('../../assets/sugarcane1.jpg'), key: '10' },
    { name: 'Nuts & Seeds', image: require('../../assets/nuts&seeds.jpg'), key: '11' },
    { name: 'Beverages', image: require('../../assets/tea.jpg'), key: '13' },
    { name: 'Other Produce', image: require('../../assets/mushroom.jpg'), key: '13' },
  ];

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return <button className="slick-arrow slick-prev" onClick={onClick}><i className="fas fa-chevron-left"></i></button>;
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return <button className="slick-arrow slick-next" onClick={onClick}><i className="fas fa-chevron-right"></i></button>;
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />, 
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 868,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner % 5) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


    const calculateTimeLeft = () => {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 2 - (endDate.getDate() % 2));
      endDate.setHours(0, 0, 0, 0);
      const difference = endDate - new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
      };
  
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => clearTimeout(timer);
    });

  const flashsalesProducts = products.filter(product => product.grouping === 'trending');
  const bestsellingProducts = products.filter(product => product.grouping === 'trending');
  
  useEffect(() => { 
      const featuredProducts = products.filter(product => product.grouping === 'featured');
      setFeaturedProducts(featuredProducts);
      setLoading(false);
  }, [products]);


  const CategoryCard = ({ category }) => {
    const handleCategoryClick = () => {
      navigate(`/products/${category.name}`);
    };
    return (
      <div className="category-item" onClick={handleCategoryClick}>
        <img  src={category.image} alt={category.name} />
        <p className="category-name">{category.name}</p>
      </div>
    );
  };

  const handleLoadMoreOrganic = () => {
    setShowAllOrganic(true);
  };
  
  const handleFlashSale = () => {
    navigate(`/flash-sales`);
  };
  
  const handleImageClick = (product) => {
    const encodedProductName = encodeURIComponent(product.name);
    const encodedProductId = encodeURIComponent(product.id);
    navigate(`/${encodedProductName}/${encodedProductId}`);
  };

  return (
    <div className="home-container">
      <div className="header">
        <div className="banner">
          <img src={currentBanner === 1 ? banner1 : currentBanner === 2 ? banner2 : currentBanner === 3 ? banner3 : currentBanner === 4 ? banner4 : banner5} alt="Banner" />
        </div>
      </div>
      <div className="category-items">
        <h3>Top Categories</h3>
        <Slider {...settings}>
          {categories.map(category => (
            <CategoryCard key={category.key} category={category} />
          ))}
        </Slider>
      </div>
      <div className="product-type-container">
        <div className="flash-sales-hero">
          <h3><FaBolt style={{color: 'gold'}}/>Flash Sales</h3>
          <div id="timer-div" className="timer">Time Left:
            {timeLeft.hours > 0 && <div className="time-item">{timeLeft.hours}<span>h</span></div>}
            {timeLeft.minutes > 0 && <div className="time-item">{timeLeft.minutes}<span>m</span></div>}
            {timeLeft.seconds > 0 && <div className="time-item">{timeLeft.seconds}<span>s</span></div>}
          </div>
          <h4 onClick={handleFlashSale} style={{cursor: 'pointer'}}>SEE ALL</h4>
        </div>
          {/* {loading ? (
            <div class="loader">
              <span class="loader-text">Loading.....</span>
                <span class="load"></span>
            </div>
          ) : ( */}
            <div className="product-container">
              {flashsalesProducts.slice(0, 8).map((product) => (
                <Card key={product.id} product={product} addToCart={() => addToCart(product, quantity)} addToFavorites={addToFavorites} favorite={favorite} />
              ))}
            </div>
          {/* )} */}
      </div>
      <div className="product-type-container">
        <h3>Best Selling Products</h3>
        <div className="category-hero">
          {bestsellingProducts.slice(0, 8).map(product => (
            <Card key={product.id} product={product} addToCart={() => addToCart(product, quantity)} addToFavorites={addToFavorites} favorite={favorite} favorite={favorite} />
          ))}
        </div>
      </div>
      {/* <div>
        <h3>Featured Products</h3>
        {loading ? (
          <div className="loader">
            <span className="loader-text">Loading...</span>
            <span className="load"></span>
          </div>
        ) : (
          <div className="featured-container">
            <div className="featured-images">
              {featuredProducts.length > 0 && (
                <img
                  src={featuredProducts[0].image_url}
                  alt="Featured Image 1"
                  onClick={() => handleImageClick(featuredProducts[0])}
                />
              )}
            </div>
            <div className="featured-images">
              {featuredProducts.length > 1 && (
                <img
                  src={featuredProducts[1].image_url}
                  alt="Featured Image 2"
                  onClick={() => handleImageClick(featuredProducts[1])}
                />
              )}
            </div>
            <div className="featured-images">
              {featuredProducts.length > 2 && (
                <img
                  src={featuredProducts[2].image_url}
                  alt="Featured Image 3"
                  onClick={() => handleImageClick(featuredProducts[2])}
                />
              )}
            </div>
          </div>
        )}
      </div> */}
      <div className="product-type-container">
        <h3>Fresh Daily Products</h3>
        <div className="category-hero">
          {bestsellingProducts.slice(0, 12).map(product => (
            <Card key={product.id} product={product} addToCart={() => addToCart(product, quantity)} addToFavorites={addToFavorites} favorite={favorite} />
          ))}
        </div>
      </div>
      <div className="product-type-container">
        <h3>Latest Products</h3>
        <div className="category-hero">
          {bestsellingProducts.slice(0, 12).map(product => (
            <Card key={product.id} product={product} addToCart={() => addToCart(product, quantity)} addToFavorites={addToFavorites} favorite={favorite} />
          ))}
        </div>
      </div>
      <div className="product-type-container">
        <h3>Organic Foods</h3>
        <div className="category-hero">
          {showAllOrganic
            ? products
              .filter((product) => product.grouping === 'trending')
              .slice(0, 16)
              .map((product) => (
                <Card key={product.id} product={product} addToCart={() => addToCart(product, quantity)} addToFavorites={addToFavorites} favorite={favorite} />
              ))
            : bestsellingProducts
                .filter((product) => product.grouping === 'trending')
                .slice(0, 8)
                .map((product) => (
                  <Card key={product.id} product={product} addToCart={() => addToCart(product, quantity)} addToFavorites={addToFavorites} favorite={favorite} />
                ))}
        </div>
        <div className='load-btn'>
          {!showAllOrganic && (
            <button className="load-more-btn" onClick={handleLoadMoreOrganic}>Load More</button>
          )}
        </div>
      </div>
      <div className="services-container">
        <div className="services-div">
          <FaTruck className="services-icon"/>
          <h4>FAST DELIVERY</h4>
          <p>Fast delivery upto 72 hours regardless of order value or destination.</p>
        </div>
        <div className="services-div">
          <FaHeadset className="services-icon"/>
          <h4>24/7 CUSTOMER SERVICE</h4>
          <p>We are available 24/7 to assist you with any questions, or issues you may have.</p>
        </div>
        <div className="services-div">
          <FaShieldAlt className="services-icon"/>
          <h4>SECURE PAYMENTS</h4>
          <p>Payments are always safe, secure and protected at all times.</p>
        </div>
      </div>
      <div className={`back-to-top ${showBackToTop ? 'visible' : ''}`} onClick={scrollToTop}>
        <FaChevronUp />
      </div>
    </div>
  );
};

export default Home;

