import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { ShoppingCart, Bell, User, Menu as MenuIcon, X, ArrowLeft, ArrowRight, Search } from 'lucide-react';

// --- DATA ---
const PRODUCTS = {
  classic: [
    { id: 101, name: "Iced Mocha", price: "₱140.00", img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=2574&auto=format&fit=crop" },
    { id: 102, name: "Matcha Latte", price: "₱160.00", img: "https://images.unsplash.com/photo-1515825838458-f2a94b20105a?q=80&w=2574&auto=format&fit=crop" },
    { id: 103, name: "Caramel Macchiato", price: "₱150.00", img: "https://images.unsplash.com/photo-1461023058943-48dbf1399f98?q=80&w=2574&auto=format&fit=crop" },
    { id: 104, name: "Dark Choco Frappe", price: "₱170.00", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=2574&auto=format&fit=crop" },
  ],
  frappe: [
    { id: 201, name: "White Choco Mocha", price: "₱155.00", img: "https://images.unsplash.com/photo-1517701604599-bb29b5c5090c?q=80&w=2574&auto=format&fit=crop" },
    { id: 202, name: "Spanish Latte", price: "₱145.00", img: "https://images.unsplash.com/photo-1632054010678-7f2e5a1a7355?q=80&w=2574&auto=format&fit=crop" },
    { id: 203, name: "Iced Americano", price: "₱110.00", img: "https://images.unsplash.com/photo-1556484687-3063616e95c9?q=80&w=2574&auto=format&fit=crop" },
    { id: 204, name: "Vanilla Cold Brew", price: "₱135.00", img: "https://images.unsplash.com/photo-1461023058943-48dbf1399f98?q=80&w=2574&auto=format&fit=crop" },
  ],
  latte: [
    { id: 301, name: "Hazelnut Latte", price: "₱150.00", img: "https://images.unsplash.com/photo-1632054010678-7f2e5a1a7355?q=80&w=2574&auto=format&fit=crop" },
    { id: 302, name: "Choco Chip Cookie", price: "₱65.00", img: "https://images.unsplash.com/photo-1499636138143-bd630f5cf386?q=80&w=2574&auto=format&fit=crop" },
    { id: 303, name: "Salmon Poke Bowl", price: "₱280.00", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2574&auto=format&fit=crop" },
    { id: 304, name: "Bagel & Cream Cheese", price: "₱120.00", img: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?q=80&w=2574&auto=format&fit=crop" },
  ],
  // Keep bestsellers for Home page
  bestsellers: [
    { id: 1, name: "Iced Mocha", price: "₱140.00", img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=2574&auto=format&fit=crop" },
    { id: 2, name: "Matcha Latte", price: "₱160.00", img: "https://images.unsplash.com/photo-1515825838458-f2a94b20105a?q=80&w=2574&auto=format&fit=crop" },
    { id: 3, name: "Caramel Macchiato", price: "₱150.00", img: "https://images.unsplash.com/photo-1461023058943-48dbf1399f98?q=80&w=2574&auto=format&fit=crop" },
    { id: 4, name: "Dark Choco Frappe", price: "₱170.00", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=2574&auto=format&fit=crop" },
    { id: 5, name: "White Choco Mocha", price: "₱155.00", img: "https://images.unsplash.com/photo-1517701604599-bb29b5c5090c?q=80&w=2574&auto=format&fit=crop" },
  ]
};

// --- SHARED COMPONENTS ---

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
        <button className="cart-btn-small">
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  </div>
);

// --- HOME PAGE COMPONENTS ---

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
          <ArrowLeft size={24} />
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

const HomePage = ({ onViewProduct }) => (
  <>
    <header className="hero">
      <div className="hero-content">
        <h1>Where great coffee<br/>meets good vibes.</h1>
        <button className="order-btn">Order Now</button>
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
        items={PRODUCTS.latte} 
        onViewProduct={onViewProduct}
      />
    </main>
  </>
);

// --- MENU PAGE COMPONENT ---

const MenuPage = ({ onViewProduct }) => {
  return (
    <div className="menu-page">
      {/* Menu Controls (Filters & Search) */}
      <div className="menu-controls-wrapper">
        <div className="menu-controls">
          <div className="filter-scroll">
            <button className="filter-btn active">Classic Coffee Series</button>
            <button className="filter-btn">Frappe</button>
            <button className="filter-btn">Latte</button>
            <button className="filter-btn">Specialty Drinks</button>
            <button className="filter-btn">Cupcakes & Baked Goods</button>
          </div>
          
          <div className="search-actions">
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <Search size={18} className="search-icon"/>
            </div>
            <button className="cart-btn-large">
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Grid Content */}
      <main className="menu-content">
        <div className="menu-section">
          <h2 className="menu-section-title">Classic Coffee Series</h2>
          <p className="menu-section-subtitle">Smooth cold brews to energize your day, with a touch of KapeBara charm.</p>
          
          <div className="menu-grid">
            {PRODUCTS.classic.map(item => (
              <ProductCard key={item.id} item={item} onView={onViewProduct} />
            ))}
            {PRODUCTS.frappe.map(item => ( // Repeating to fill grid like the image
              <ProductCard key={item.id + 'dup'} item={item} onView={onViewProduct} />
            ))}
          </div>
        </div>

        <div className="menu-section">
          <h2 className="menu-section-title">Frappe</h2>
          <p className="menu-section-subtitle">Lorem ipsum or smthing idk</p>
          
          <div className="menu-grid">
            {PRODUCTS.latte.map(item => (
              <ProductCard key={item.id} item={item} onView={onViewProduct} />
            ))}
            {PRODUCTS.classic.map(item => (
              <ProductCard key={item.id + 'dup2'} item={item} onView={onViewProduct} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// --- COMPONENT: Product Details Modal ---
const ProductModal = ({ product, onClose, relatedItems, onViewProduct }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="back-btn" onClick={onClose}>
          <ArrowLeft size={20} />
        </button>

        <div className="modal-body">
          <div className="product-split">
            <div className="modal-img-container">
              <img src={product.img} alt={product.name} className="modal-img" />
            </div>

            <div className="modal-info">
              <h3 className="modal-subtitle">Product Name</h3>
              <h1 className="modal-title">{product.name}</h1>
              <h2 className="modal-price">{product.price}</h2>
              <p className="modal-desc">
                Short description of the product. Pwede siya mas mahaba depende sa maisip ilagay, pero for now ito muna placeholder kase katamad magcopy ng lorem ipsum sa google.
              </p>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>

          <div className="related-items-section">
            <h3 className="related-title">Related Items</h3>
            <div className="related-grid">
               {relatedItems && relatedItems.slice(0, 3).map(item => (
                 <ProductCard key={item.id} item={item} onView={onViewProduct} />
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
function App() {
  const [currentPage, setCurrentPage] = useState('menu'); // Defaulting to 'menu' so you see it first
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Helper to open modal
  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  // Helper to close modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // Helper to navigate
  const navigateTo = (page, e) => {
    if (e) e.preventDefault();
    setCurrentPage(page);
    setIsMobileMenuOpen(false); // Close mobile menu if open
    window.scrollTo(0, 0); // Scroll to top
  };

  return (
    <div className={`app-container ${selectedProduct ? 'modal-open' : ''}`}>
      
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo" onClick={(e) => navigateTo('home', e)}>Kapebara</div>
        
        <div className="nav-center">
          <a 
            href="#" 
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} 
            onClick={(e) => navigateTo('home', e)}
          >
            Home
          </a>
          <a 
            href="#" 
            className={`nav-link ${currentPage === 'menu' ? 'active' : ''}`} 
            onClick={(e) => navigateTo('menu', e)}
          >
            Menu
          </a>
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

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="#" onClick={(e) => navigateTo('home', e)}>Home</a>
        <a href="#" onClick={(e) => navigateTo('menu', e)}>Menu</a>
        <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Your Order</a>
        <div className="mobile-logout">
          <button onClick={() => alert("Logged out")}>Log Out</button>
        </div>
      </div>

      {/* PAGE CONTENT SWITCHER */}
      {currentPage === 'home' ? (
        <HomePage onViewProduct={handleViewProduct} />
      ) : (
        <MenuPage onViewProduct={handleViewProduct} />
      )}

      {/* PRODUCT MODAL */}
      <ProductModal 
        product={selectedProduct} 
        onClose={handleCloseModal}
        relatedItems={PRODUCTS.classic} // Passing some data for related items
        onViewProduct={handleViewProduct}
      />

      <footer>
        <p>© 2024 Kapebara Coffee. All rights reserved.</p>
      </footer>
    </div>
  );
} 

export default App;