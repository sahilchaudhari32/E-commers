import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [isPop, setIsPop] = useState(false);

  useEffect(() => {
    if (cart.length === 0) return;
    setIsPop(true);
    const timer = setTimeout(() => setIsPop(false), 400);
    return () => clearTimeout(timer);
  }, [cart.length]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">ShopHub</div>
        <div className="navbar-links">
          <NavLink to="/" end>📦 Products</NavLink>
          <NavLink to="/cart" className="cart-link">
            🛒 Cart
            {totalItems > 0 && (
              <span className={`cart-badge ${isPop ? 'cart-badge-pop' : ''}`}>
                {totalItems}
              </span>
            )}
          </NavLink>
          <NavLink to="/about">ℹ️ About</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;