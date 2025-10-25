import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../redux/cartSlice';

const ShoppingCart = () => {
  // Use useSelector to get the 'items' array from the 'cart' state
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (e, id) => {
    const quantity = e.target.value;
    if (quantity >= 0) {
        dispatch(updateQuantity({ id, quantity: Number(quantity) }));
    }
  };

  if (cartItems.length === 0) {
    return <div style={{marginTop: '20px'}}>Shopping Cart is empty.</div>;
  }

  return (
    <div style={styles.cartContainer}>
      <h2>Shopping Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} style={styles.cartItem}>
          <p style={styles.itemDetails}>
            {item.name} (${item.price})
          </p>
          
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(e, item.id)}
            style={styles.quantityInput}
          />
          
          <button onClick={() => handleRemove(item.id)} style={styles.removeButton}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;

// Basic Styling
const styles = {
  cartContainer: { marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'center' },
  cartItem: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '10px 0' },
  itemDetails: { minWidth: '150px', textAlign: 'right' },
  quantityInput: { width: '40px', textAlign: 'center' },
  removeButton: { backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' },
};