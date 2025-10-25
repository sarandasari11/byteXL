import React from 'react';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';

const App = () => {
  return (
    <div style={styles.appContainer}>
      <h1>My Shop</h1>
      
      <ProductList />
      
      <hr style={styles.separator} />
      
      <ShoppingCart />
    </div>
  );
};

export default App;

// Basic Styling
const styles = {
  appContainer: { textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' },
  separator: { width: '80%', margin: '40px auto', borderColor: '#ccc' }
};