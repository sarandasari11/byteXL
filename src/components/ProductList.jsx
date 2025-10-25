import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';

const PRODUCTS = [
  { id: 'laptop', name: 'Laptop', price: 1200 },
  { id: 'mouse', name: 'Mouse', price: 25 },
  { id: 'keyboard', name: 'Keyboard', price: 45 },
];

const ProductList = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    // Dispatch the addItem action with the product details
    dispatch(addItem(product));
  };

  return (
    <div>
      <h2>Products</h2>
      <div style={styles.productList}>
        {PRODUCTS.map(product => (
          <div key={product.id} style={styles.productCard}>
            <p style={styles.productName}>{product.name}</p>
            <p style={styles.productPrice}>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

// Basic Styling
const styles = {
  productList: { display: 'flex', gap: '20px', justifyContent: 'center' },
  productCard: { border: '1px solid #ccc', padding: '15px', textAlign: 'center', width: '150px' },
  productName: { fontSize: '1.2em', fontWeight: 'bold' },
  productPrice: { color: 'green' },
};