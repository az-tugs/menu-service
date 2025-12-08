import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { ShoppingCart, Bell, User, Menu as MenuIcon, X, ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { PRODUCTS } from './data'; 
import Menu from './Menu'; 
import logo from './assets/logo.png'; 

// shared components
const ProductCard = ({ item, onView }) => (
  <div className="product-card">
    <div className="img-container">
      <img src={item.img} alt={item.name} className="product-img" />
    </div>
    <div className="card-details">
      <h3 className="product-name">{item.name}</h3>
      <p className="product-price">{item.price}</p>
      <div className="card-buttons">
        <button className="view-btn" onClick={() => onView(item)}>View</button>
      </div>
    </div>
  </div>
);

// carousel
const CarouselSection = ({ title, subtitle, items, onViewProduct }) => {
  const scrollRef = useRef(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftBtn(scrollLeft > 5);
      setShowRightBtn(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const scrollAmount = containerWidth / 3; 
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      checkScroll();
      currentRef.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    };
  }, [items]);

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
      </div>
      <div className="carousel-container">
        <button className={`nav-arrow left ${!showLeftBtn ? 'hidden' : ''}`} onClick={() => scroll('left')}>
          <ArrowLeft size={50} />
        </button>
        <div className="products-scroll" ref={scrollRef}>
          {items.map(item => (
            <div className="carousel-item" key={item.id}>
               <ProductCard item={item} onView={onViewProduct} />
            </div>
          ))}
        </div>
        <button className={`nav-arrow right ${!showRightBtn ? 'hidden' : ''}`} onClick={() => scroll('right')}>
          <ArrowRight size={24} />
        </button>
      </div>
    </section>
  );
};

// home page content
const HomePage = ({ onViewProduct, onOrderNow }) => (
  <>
    <header className="hero">
      <div className="hero-content">
        <h1>Where great coffee<br/>meets good vibes.</h1>
        <button className="order-btn" onClick={onOrderNow}>Order Now</button>
      </div>
    </header>
    <main>
      <CarouselSection 
        title="Bestsellers You Can't Go Wrong With" 
        subtitle="Your soon-to-be favorites, too." 
        items={PRODUCTS.bestsellers} 
        onViewProduct={onViewProduct}
      />
      <CarouselSection 
        title="Beverages" 
        subtitle="From mellow mornings to fizzy afternoons." 
        items={PRODUCTS.frappe} 
        onViewProduct={onViewProduct}
      />
      <CarouselSection 
        title="Snacks & Desserts" 
        subtitle="Sweet or savory, every bite is a happiness." 
        items={PRODUCTS.cupcakes} 
        onViewProduct={onViewProduct}
      />
    </main>
  </>
);

function App() {
  const [currentPage, setCurrentPage] = useState('menu'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [selectedProduct]);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const navigateTo = (page, e) => {
    if (e) e.preventDefault();
    setCurrentPage(page);
    setIsMobileMenuOpen(false); 
    window.scrollTo(0, 0); 
  };

  return (
    <div className="app-container">
      
      <nav className="navbar">
        <div className="logo" onClick={(e) => navigateTo('home', e)}>
           <img src={logo} alt="Kapebara Logo" className="logo-img" />
        </div>
        
        <div className="nav-center">
          <a href="#" className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} onClick={(e) => navigateTo('home', e)}>Home</a>
          <a href="#" className={`nav-link ${currentPage === 'menu' ? 'active' : ''}`} onClick={(e) => navigateTo('menu', e)}>Menu</a>
          <a href="#" className="nav-link">Your Order</a>
        </div>

        <div className="nav-icons">
          <button className="icon-btn"><Bell size={24} /></button>
          <button className="icon-btn hidden-mobile"><User size={24} /></button>
          <button className="logout-btn hidden-mobile">Log Out</button>
          <button className="menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </nav>

      {/* mobile menu wala pa e2 rn */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="#" onClick={(e) => navigateTo('home', e)}>Home</a>
        <a href="#" onClick={(e) => navigateTo('menu', e)}>Menu</a>
        <div className="mobile-logout">
          <button onClick={() => alert("Logged out")}>Log Out</button>
        </div>
      </div>

      {/* page content */}
      {currentPage === 'home' ? (
        <HomePage 
          onViewProduct={handleViewProduct} 
          onOrderNow={(e) => navigateTo('menu', e)} 
        />
      ) : (
        <Menu onViewProduct={handleViewProduct} />
      )}

      {/* sa view */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            
            <button className="modal-back-btn" onClick={handleCloseModal}>
              <ArrowLeft size={30} />
            </button>

            <div className="modal-body">
              <div className="product-split">
                <div className="modal-img-container">
                  <img src={selectedProduct.img} alt={selectedProduct.name} className="modal-img" />
                </div>
                
                <div className="modal-info">
                  <span className="modal-label">Product Name</span>
                  <h1 className="modal-big-title">{selectedProduct.name}</h1>
                  <p className="modal-description">
                    Short description of the product. Pwede siya mas mahaba depende sa maisip ilagay, 
                    pero for now ito muna placeholder kase katamad magcopy ng lorem ipsum.
                  </p>
                  
                  <h2 className="modal-price-text">{selectedProduct.price}</h2>
                  
                  <button className="modal-add-btn">Add to Cart</button>
                </div>
              </div>

              <div className="related-items-section">
                <h3 className="related-title">Related Items</h3>
                <div className="related-grid">
                   {PRODUCTS.classic.slice(0, 3).map(item => (
                     <div key={item.id} className="related-card"> 
                        <div className="related-img-container">
                          <img src={item.img} alt={item.name} className="related-img" />
                        </div>
                        <div className="related-details">
                          <h4 className="related-name">{item.name}</h4>
                          <p className="related-price">{item.price}</p>
                          <button className="related-view-btn" onClick={() => handleViewProduct(item)}>View</button>
                        </div>
                     </div>
                   ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <footer>
        <p>Di pa final na footer to, ask q pa sa kabilang group. tulog na q mayamaya</p>
      </footer>
    </div>
  );
} 

export default App;