const initialState = {
  sepet: []
};

function sepetReducers(state = initialState, action) {
  switch (action.type) {

    case 'ADD_CART':
      const { payload } = action;
      const existingProductIndex = state.sepet.findIndex(p => p.id === payload.id);
      if (existingProductIndex >= 0) {
        const updatedSepet = state.sepet.map((item, index) => {
          if (index === existingProductIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return { ...state, sepet: updatedSepet };
      } else {
        return { ...state, sepet: [...state.sepet, payload] };
      };

    case 'INCREASE_QUANTITY':
      return {
        ...state,
        sepet: state.sepet.map((item, index) =>
          index === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };

    case 'DECREASE_QUANTITY':
      return {
        ...state,
        sepet: state.sepet.map((item, index) =>
          index === action.payload ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
        ),
      };

    case 'REMOVE_PRODUCT':
      return {
        ...state,
        sepet: state.sepet.filter(item => item.id !== action.payload),
      };

    case 'SET_SEPET':
      return { ...state, sepet: action.payload };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        sepet: state.sepet.map((item, idx) =>
          idx === action.payload.index ? { ...item, quantity: action.payload.quantity } : item
        ),
      };

    default:
      return state;
  }
}


export default sepetReducers;
