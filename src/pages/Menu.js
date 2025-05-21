import React, { useState, useEffect } from 'react';
import Dish from '../pages/Dish';
import Reviews from './Reviews';
import '../styles/style.css';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function Menu() {
  const [menuData, setMenuData] = useState({
    ramen: [],
    seafood: [],
    drinks: [],
  });
  const [activeCategory, setActiveCategory] = useState('ramen');
  const [searchText, setSearchText] = useState('');
  const [sortType, setSortType] = useState('price-asc');

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
       
        const querySnapshot = await getDocs(collection(db, 'menu'));
        const newMenuData = { ramen: [], seafood: [], drinks: [] };

        
        querySnapshot.forEach((doc) => {
          const data = { id: doc.id, ...doc.data() };
          if (data.category && newMenuData[data.category]) {
            newMenuData[data.category].push(data);
          }
        });

        setMenuData(newMenuData);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };
    fetchMenuData();
  }, []);

  const showCategory = (category) => {
    setActiveCategory(category);
    setSearchText('');
  };

  const filterMenu = (text) => {
    setSearchText(text);
  };

  const sortMenu = (category, type) => {
    const sorted = [...menuData[category]].sort((a, b) => {
      if (type === 'price-asc') {
        return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      } else if (type === 'price-desc') {
        return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
      } else if (type === 'popularity') {
        return b.popularity - a.popularity;
      }
      return 0;
    });
    return sorted;
  };

  const reviewsData = [
    {
      author: 'Anastasia Bilyk',
      role: 'Web Developer',
      text: 'Amazing food and great atmosphere! The ramen is a must-try.',
      rating: 5,
    },
    {
      author: 'Mykhailo Sydor',
      role: 'Designer',
      text: 'Loved the sushi set, fresh and delicious!',
      rating: 4,
    },
  ];

  return (
    <section className="menu-section">
      <h2>Our Menu</h2>
      <input
        type="text"
        id="search"
        placeholder="Search dishes..."
        value={searchText}
        onChange={(e) => filterMenu(e.target.value)}
      />
      <div id="no-results" className={searchText && !menuData[activeCategory].some(dish => dish.name.toLowerCase().includes(searchText.toLowerCase())) ? 'show' : ''}>
        Nothing found
      </div>
      <select
        id="sortMenu"
        className="sort-select"
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
      <div className="category-select">
        {Object.keys(menuData).map((category) => (
          <button
            key={category}
            className="category-btn"
            onClick={() => showCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      {Object.keys(menuData).map((category) => (
        <div
          key={category}
          id={category}
          className="menu-category"
          style={{ display: activeCategory === category ? 'block' : 'none' }}
        >
          <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <table className="menu-table">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Image</th>
                <th>Price</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {sortMenu(category, sortType)
                .filter((dish) => dish.name.toLowerCase().includes(searchText.toLowerCase()))
                .map((dish, index) => (
                  <Dish
                    key={dish.id}
                    dish={dish}
                    category={category}
                    index={index}
                  />
                ))}
            </tbody>
          </table>
        </div>
      ))}
      <Reviews reviews={reviewsData} />
    </section>
  );
}

export default Menu;