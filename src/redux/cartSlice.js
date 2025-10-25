import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // [{ id: 'laptop', name: 'Laptop', price: 1200, quantity: 1 }]
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 1. ADD ITEM
    addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        // If the item already exists, just increase the quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add the new item with a quantity of 1
        state.items.push({ ...product, quantity: 1 });
      }
    },

    // 2. REMOVE ITEM
    removeItem: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
    },

    // 3. UPDATE QUANTITY
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);

      if (itemToUpdate) {
        itemToUpdate.quantity = Number(quantity);
        
        // Optional: Remove if quantity is set to 0
        if (itemToUpdate.quantity <= 0) {
            state.items = state.items.filter(item => item.id !== id);
        }
      }
    },
  },
});

// Export the actions
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;