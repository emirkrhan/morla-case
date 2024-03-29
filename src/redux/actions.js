export const addProductToCart = (product) => ({
    type: 'ADD_CART',
    payload: { ...product, quantity: product.quantity || 1 },
  });
  
export const increaseQuantity = (index) => ({
  type: 'INCREASE_QUANTITY',
  payload: index,
});

export const decreaseQuantity = (index) => ({
  type: 'DECREASE_QUANTITY',
  payload: index,
});

export const updateQuantity = (index, quantity) => ({
  type: 'UPDATE_QUANTITY',
  payload: { index, quantity },
});

export const removeProduct = (productId) => ({
  type: 'REMOVE_PRODUCT',
  payload: productId,
});

export const setSepet = (sepet) => ({
  type: 'SET_SEPET',
  payload: sepet,
});


