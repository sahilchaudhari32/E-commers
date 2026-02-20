import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="card fade-in">
      <div className="card-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3 className="card-title">{product.title}</h3>
        <div className="card-footer">
          <span className="card-price">${product.price}</span>
          <button
            className={`btn ${added ? 'btn-added' : 'btn-primary'}`}
            onClick={handleAdd}
          >
            {added ? 'Added! ✅' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;