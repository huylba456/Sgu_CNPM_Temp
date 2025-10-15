import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <img src={product.image} alt={product.name} className="card-image" />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="muted">{product.restaurant}</p>
        <p>{product.description}</p>
        <div className="card-footer">
          <span className="price">{product.price.toLocaleString()} đ</span>
          <div className="actions">
            <Link to={`/products/${product.id}`} className="secondary">
              Chi tiết
            </Link>
            <button type="button" onClick={() => addToCart(product)}>
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
