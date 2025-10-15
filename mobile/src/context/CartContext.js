import { createContext, useContext, useMemo, useReducer } from 'react';

const CartContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'UPDATE':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        )
      };
    case 'REMOVE':
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const value = useMemo(
    () => ({
      items: state.items,
      add: (product) => dispatch({ type: 'ADD', payload: product }),
      update: (id, quantity) => dispatch({ type: 'UPDATE', payload: { id, quantity } }),
      remove: (id) => dispatch({ type: 'REMOVE', payload: id }),
      clear: () => dispatch({ type: 'CLEAR' })
    }),
    [state.items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
