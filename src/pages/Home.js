import React, { useState } from 'react';
import '../styles/style.css';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const foodItems = [
    {
      title: 'Ramen soup with duck',
      description: 'Hearty dish of tender duck slices over noodles in rich, flavorful broth. Topped with scallions, egg, and sesame seeds for a comforting, savory experience.',
      image: '/images/items1-removebg-preview.png',
    },
    {
      title: 'Shrimp curry',
      description: 'A creamy, flavorful dish featuring tender shrimp simmered in a spiced coconut milk sauce. Rich, aromatic, and perfectly balanced with heat and sweetness.',
      image: '/images/items2-removebg-preview.png',
    },
    {
      title: 'Chicken Chow Mein',
      description: 'A stir-fried noodle dish with tender chicken, crisp vegetables, and savory soy-based sauce. Flavorful, hearty, and packed with texture.',
      image: '/images/items3-removebg-preview (1).png',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % foodItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + foodItems.length) % foodItems.length);
  };

  return (
    <div className="home">
      <div className="main_slide">
        <div>
          <h1>
            A Taste of Asia <span>in Every Bite!</span>
          </h1>
          <p>Welcome to AnAsian, where authentic Asian flavors come to life! Immerse yourself in a vibrant culinary experience as we bring you the best dishes from across Asia, featuring fresh ingredients and traditional recipes.</p>
          <button className="gray_button" >About us</button>
        </div>
        <div>
          <img src="/images/items2-removebg-preview.png" alt="" style={{ boxShadow: '0 10px 10px #808080', borderRadius: '50px' }} />
        </div>
      </div>
      <div className="food_items_container">
        <div className="food_items">
          <button className="prev" onClick={prevSlide}>❮</button>
          {foodItems.map((item, index) => (
            <div
              key={index}
              className={`items ${index === currentSlide ? 'active' : ''}`}
            >
              <div>
                <img src={item.image} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button className="yellow_button">See Menu</button>
            </div>
          ))}
          <button className="next" onClick={nextSlide}>❯</button>
        </div>
      </div>
      <div className="main_slide2">
        <div className="foodimg">
          <img src="/images/istockphoto-1223612183-612x612-removebg-preview.png" alt="" style={{ width: '370px' }} />
        </div>
        <div className="question">
          <div>
            <h2>Why People Choose Us?</h2>
          </div>
          <div>
            <div className="q-ans">
              <div>
                <img src="/images/items3-removebg-preview (1).png" alt="" style={{ width: '45px' }} />
              </div>
              <div>
                <h4>Choose your favourite</h4>
                <p>People choose us for our authentic Asian flavors, fresh ingredients, cozy atmosphere, and friendly service.</p>
              </div>
            </div>
            <div className="q-ans">
              <div>
                <img src="/images/items1-removebg-preview.png" alt="" style={{ width: '45px' }} />
              </div>
              <div>
                <h4>Delight in your favorite</h4>
                <p>Our patrons appreciate the authentic Asian experience, fresh flavors, comfortable surroundings, and outstanding service.</p>
              </div>
            </div>
            <div className="q-ans">
              <div>
                <img src="/images/items2-removebg-preview.png" alt="" style={{ width: '50px' }} />
              </div>
              <div>
                <h4>Uncover your favorite</h4>
                <p>Guests love us for our traditional Asian dishes, fresh produce, warm environment, and attentive staff.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main_slide3">
        <div className="fav-head">
          <h3>Our Popular Food Items</h3>
          <p>Discover our most loved dishes, crafted with authentic Asian flavors.</p>
        </div>
        <div className="fav-food-container">
          <div className="fav-food">
            {foodItems.map((item, index) => (
              <div key={index} className="items">
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p className="fav-price">${(index + 11.9 + index * 0.6).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="dsgn"></div>
      </div>
      <div className="main_slide4">
        <div className="chef-feed">
          <h2>Customer <span style={{ color: '#ffe36f' }}>Feedback</span></h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex quasi, voluptas necessitatibus dolore facilis ab, inventore fugit exercitationem soluta, perspiciatis voluptates id? Facere rerum at blanditiis maiores iure libero ab.</p>
          <div className="chef-detail">
            <div>
              <img src="/images/istockphoto-1223612183-612x612-removebg-preview.png" alt="" />
            </div>
            <div>
              <h6>Anastasia Bilyk</h6>
              <p>Web Developer</p>
            </div>
          </div>
          <div className="chef-vic">
            <div>
              <i className="fa-solid fa-hand-peace"></i>
              <h4>68</h4>
              <p>Lorem ipsum dolor sit amet</p>
            </div>
            <div>
              <i className="fa-solid fa-trophy"></i>
              <h4>956</h4>
              <p>Lorem ipsum dolor sit amets</p>
            </div>
          </div>
        </div>
        <div className="chef">
          <img src="/images/Дизайн без названия (1).jpg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;