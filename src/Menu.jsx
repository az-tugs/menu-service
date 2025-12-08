import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import './App.css'; 
import { PRODUCTS } from './data'; 

// product card
const ProductCard = ({ item, onView }) => (
  <div className="product-card">
    <div className="img-container">
      <img src={item.img} alt={item.name} className="product-img" />
    </div>
    <div className="card-details">
      <h3 className="product-name">{item.name}</h3>
      <p className="product-price">{item.price}</p>
      <div className="card-buttons">
        <button className="view-btn" onClick={() => onView && onView(item)}>View</button>
      </div>
    </div>
  </div>
);

const Menu = ({ onViewProduct }) => {
  const [activeCategory, setActiveCategory] = useState('classic');

  const categories = [
    { id: 'classic', label: 'Classic Coffee Series' },
    { id: 'frappe', label: 'Frappe' },
    { id: 'latte', label: 'Latte' },
    { id: 'specialty', label: 'Specialty Drinks' },
    { id: 'cupcakes', label: 'Cupcakes & Baked Goods' },
    { id: 'snacks', label: 'Snacks & Rice Bowls' } 
  ];

  const scrollToSection = (id) => {
    setActiveCategory(id); 
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 180;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      // pang determine if nasaang section na ba (for scroll scroll effect dun sa nav ng categories)
      const triggerPoint = window.scrollY + 220;
      
      let currentSection = activeCategory; 

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        setActiveCategory('snacks');
        return;
      }

      for (const cat of categories) {
        const element = document.getElementById(cat.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (triggerPoint >= offsetTop && triggerPoint < offsetTop + offsetHeight) {
            currentSection = cat.id;
          }
        }
      }

      if (currentSection !== activeCategory) {
        setActiveCategory(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory]); 

  return (
    <div className="menu-page">
      <div className="menu-controls-wrapper">
        <div className="menu-controls">
          
          {/* category nav slush left pill */}
          <div className="filter-scroll">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => scrollToSection(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          
          <div className="search-actions">
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <Search size={20} className="search-icon"/>
            </div>
            <button className="cart-btn-large">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>

      <main className="menu-content">
        <div id="classic" className="menu-section">
          <h2 className="menu-section-title">Classic Coffee Series</h2>
          <div className="menu-grid">
            {PRODUCTS.classic.map(item => <ProductCard key={item.id} item={item} onView={onViewProduct} />)}
          </div>
        </div>

        <div id="frappe" className="menu-section">
          <h2 className="menu-section-title">Frappe</h2>
          <div className="menu-grid">
            {PRODUCTS.frappe.map(item => <ProductCard key={item.id} item={item} onView={onViewProduct} />)}
          </div>
        </div>

        <div id="latte" className="menu-section">
          <h2 className="menu-section-title">Latte</h2>
          <div className="menu-grid">
            {PRODUCTS.latte.map(item => <ProductCard key={item.id} item={item} onView={onViewProduct} />)}
          </div>
        </div>

        <div id="specialty" className="menu-section">
          <h2 className="menu-section-title">Specialty Drinks</h2>
          <div className="menu-grid">
            {PRODUCTS.specialty.map(item => <ProductCard key={item.id} item={item} onView={onViewProduct} />)}
          </div>
        </div>

        <div id="cupcakes" className="menu-section">
          <h2 className="menu-section-title">Cupcakes & Baked Goods</h2>
          <div className="menu-grid">
            {PRODUCTS.cupcakes.map(item => <ProductCard key={item.id} item={item} onView={onViewProduct} />)}
          </div>
        </div>

        <div id="snacks" className="menu-section">
          <h2 className="menu-section-title">Snacks & Rice Bowls</h2>
          <div className="menu-grid">
            {PRODUCTS.snacks.map(item => <ProductCard key={item.id} item={item} onView={onViewProduct} />)}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Menu;